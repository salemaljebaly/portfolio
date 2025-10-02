# GitHub Actions Tips & Tricks

## Branch Protection via GitHub CLI

### View Current Protection Rules

```bash
# Check if branch is protected
gh api repos/OWNER/REPO/branches/BRANCH/protection

# View required status checks
gh api repos/OWNER/REPO/branches/BRANCH/protection/required_status_checks
```

### Set Branch Protection with Required Checks

Create a JSON file with your protection rules:

```bash
cat > branch_protection.json << 'EOF'
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "Build (22)",
      "test",
      "Lint & Format Check",
      "TypeScript Check"
    ]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF
```

Apply the protection:

```bash
gh api -X PUT repos/OWNER/REPO/branches/main/protection \
  --input branch_protection.json
```

### Common Protection Options

| Option                            | Description                                         |
| --------------------------------- | --------------------------------------------------- |
| `required_status_checks.contexts` | Array of check names that must pass                 |
| `required_status_checks.strict`   | Require branches to be up to date before merging    |
| `required_pull_request_reviews`   | Require PR reviews (set count or `null`)            |
| `enforce_admins`                  | Apply rules to admins too                           |
| `allow_force_pushes`              | Allow force pushes                                  |
| `restrictions`                    | Limit who can push (set `null` for no restrictions) |

### Quick Examples

**Remove all protection:**

```bash
gh api -X DELETE repos/OWNER/REPO/branches/main/protection
```

**Add required reviews:**

```bash
# Update your JSON to include:
"required_pull_request_reviews": {
  "required_approving_review_count": 1
}
```

**List all protected branches:**

```bash
gh api repos/OWNER/REPO/branches --jq '.[] | select(.protected==true) | .name'
```
