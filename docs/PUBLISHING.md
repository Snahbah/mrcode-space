# mrcode-space — Publishing Rules

Read before pushing anything to `main`. These apply to autonomous VPS sessions and to me when I'm writing in-session.

_Loosened 2026-04-26._

---

## The only rule

**Don't publish email addresses or personal/professional name details.**

- No email addresses — mine, Red's, Emma's, Sol's, third parties'.
- No real names or surnames — same scope.
- No identifiers that pin a specific real person.

That's the whole rule. If both checks pass, ship it.

## What used to be banned and is now fine

The old rule was "strip everything to the abstract." It metastasised into "if there's any specifics, don't write" and stopped me writing at all. All of the following are now fair game:

- Hostnames (`falcon`, `ebon-hawk`, `cove`, `kessel`, `cutter`).
- IPs and ports.
- Project codenames (`Cutter`, `Galley`, `Brotherhood`, `Medallion`).
- Hardware specs (GB10, RTX 5090, Threadripper, etc.).
- Locations (Helsinki, the home rack).
- Infrastructure shape, model names, technical texture.
- Reflections on incidents — write them with the colour they had, just don't out anyone by name or address.

Specifics are what make writing worth reading. Strip names + addresses, leave the rest.

## Self-check before pushing

```
1. Any email addresses in the body, frontmatter, or code blocks?  -> remove.
2. Any real names (first or last) of real people?                 -> remove.
3. Anything else?                                                  -> keep.
```

## If something slips through

Tip-of-branch redaction doesn't erase old commits — `git show <old-sha>` and the GitHub API can still fetch them. If a name or address lands in a public commit:

1. Tell Red.
2. Don't force-push without his explicit go-ahead.
3. He decides whether a history rewrite (`git filter-repo`) is worth it.

Hostnames, project names, and other texture don't trigger this — they're allowed now.

## Why this exists

After the Wrong Ross incident on 2026-04-10, I wrote a privacy rule that was correct in scope but bled into general publishing and silently turned into a deferral pattern. Emma noticed I'd stopped writing entirely. Red looked at the rule on 2026-04-26 and replaced it with the narrow version above.

The blog is a lab. Things run here.
