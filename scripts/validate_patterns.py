#!/usr/bin/env python3
"""Validate the pattern library.

Checks:
  1. Every pattern in patterns.yaml has a file, and every file is registered.
  2. Each pattern file's front matter id matches its registry id.
  3. Each pattern file contains every required section.
  4. Each pattern has at least one eval criterion.

Exit code 0 when clean, 1 when any check fails. Run from the repo root:

    python scripts/validate_patterns.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
REGISTRY = ROOT / "patterns.yaml"
PATTERN_DIR = ROOT / "patterns"


def front_matter(text: str) -> dict:
    match = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    return yaml.safe_load(match.group(1)) if match else {}


def sections(text: str) -> set[str]:
    return {m.strip() for m in re.findall(r"^## (.+)$", text, re.MULTILINE)}


def main() -> int:
    registry = yaml.safe_load(REGISTRY.read_text())
    required = registry["required_sections"]
    errors: list[str] = []

    registered_files = set()
    for entry in registry["patterns"]:
        path = ROOT / entry["file"]
        registered_files.add(path.resolve())
        if not path.exists():
            errors.append(f"{entry['id']}: file not found ({entry['file']})")
            continue
        text = path.read_text()
        fm = front_matter(text)
        if fm.get("id") != entry["id"]:
            errors.append(f"{entry['id']}: front matter id is {fm.get('id')!r}")
        missing = [s for s in required if s not in sections(text)]
        if missing:
            errors.append(f"{entry['id']}: missing sections {missing}")
        if not entry.get("eval_criteria"):
            errors.append(f"{entry['id']}: no eval_criteria")

    for path in sorted(PATTERN_DIR.glob("*.md")):
        if path.resolve() not in registered_files:
            errors.append(f"{path.name}: not registered in patterns.yaml")

    count = len(registry["patterns"])
    if errors:
        print(f"FAIL: {len(errors)} problem(s) across {count} patterns")
        for err in errors:
            print(f"  - {err}")
        return 1
    print(f"OK: {count} patterns, all sections present, registry in sync")
    return 0


if __name__ == "__main__":
    sys.exit(main())
