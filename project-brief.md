# PROJECT BRIEF

## GOAL

Produce a complete, coherent, premium cinematic reveal sequence for a
fictional flagship mobile phone. The final sequence must feel like a real
high-end smartphone launch commercial.

## REQUIREMENTS

- Photorealistic
- Premium
- Cinematic
- Futuristic
- Minimal
- Sophisticated
- Technically believable
- Visually coherent
- Consistent across every shot

## CONSTRAINTS

- The phone is ONE physical object. No redesigns, no changing proportions,
  no changing materials, no changing colors, no changing lens count.
- Every agent must reference the canonical product specification.
- No agent may redesign the phone independently.
- Avoid generic AI imagery, cheap CGI, excessive VFX, random camera
  movement, inconsistent phone designs, changing camera layouts, warped
  geometry, inconsistent materials, random environments, excessive text,
  unnecessary particles, and visual noise.

## CONTEXT

- Project structure: MASTER.md orchestrator blueprint
- Pipeline: Creative Director → Product Design → Storyboard →
  Cinematography → Prompt Engineering → Generation → Continuity →
  Editing → QA
- Deliverables: project-brief.md, creative-direction.md, product-spec.md,
  product-reference/, storyboard.md, cinematography.md, prompts/01-09.md,
  edit-plan.md, qa-report.md
- Git worktrees for parallel agents; commits as checkpoints

## DEPENDENCIES

1. Creative Direction (no dependencies)
2. Product Design (depends on Creative Direction)
3. Cinematography (depends on Creative Direction)
4. Storyboard (depends on Product Design + Cinematography)
5. Prompt Engineering (depends on Storyboard + Product Design)
6. Generation (depends on Prompt Engineering)
7. Continuity (depends on Generation + Product Design)
8. Editing (depends on Continuity)
9. Final QA (depends on Editing)

## DELIVERABLES

- project-brief.md
- creative-direction.md
- product-spec.md
- product-reference/canonical-phone-reference.*
- storyboard.md
- cinematography.md
- prompts/01-introduction.md
- prompts/02-silhouette.md
- prompts/03-reveal.md
- prompts/04-camera.md
- prompts/05-material.md
- prompts/06-display.md
- prompts/07-feature.md
- prompts/08-hero-movement.md
- prompts/09-final-hero.md
- edit-plan.md
- qa-report.md

## ACCEPTANCE CRITERIA

- Creative direction approved
- Canonical phone established
- Storyboard complete
- Cinematography defined
- Production prompts complete
- Shots generated
- Continuity verified
- Editing structure complete
- Final QA passed
- No major continuity errors remain
- Final sequence feels like one commercial
- Product remains consistent
- All important deliverables are documented

## VERIFICATION

- Every agent output is inspected against its acceptance criteria
- Continuity agent verifies every shot against product-spec.md
- QA agent performs independent final review
- Orchestrator independently verifies the final result
- Do not claim completion simply because all agents reported "done"