# Deployment Setup

## GitHub Actions Auto-Deploy

The repository is now set up to automatically build and deploy on every push to `main`.

### Workflow

1. **Local**: Edit posts/TILs in Obsidian vault
2. **Local**: Commit changes and run `git push`
3. **Pre-push hook** (automatic):
   - Runs `pnpm sync:content` to mirror vault → `src/content/`
   - Stages content changes
   - Fails if content changed (so you amend & push again)
4. **GitHub**: Actions workflow runs automatically
   - Installs dependencies
   - Runs `pnpm build`
   - Deploys to VPS via rsync over SSH

**Note:** The pre-push hook prevents accidental pushes without vault sync. If it fails, just run `git push` again after reviewing staged content.

### Required Secrets

Configure these in GitHub repository settings → Secrets and Variables → Actions:

| Secret | Value | Example |
|--------|-------|---------|
| `VPS_SSH_KEY` | Your SSH private key (ed25519 format) | `-----BEGIN OPENSSH PRIVATE KEY-----\n...` |
| `VPS_HOST` | VPS hostname or IP | `144.91.71.70` |
| `VPS_USER` | SSH username | `deploy` |

### SSH Key Setup

1. Generate key (if needed):
   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/blog_deploy -N ""
   ```

2. Add public key to VPS `~deploy/.ssh/authorized_keys`:
   ```bash
   cat ~/.ssh/blog_deploy.pub | ssh deploy@<VPS_HOST> "cat >> ~/.ssh/authorized_keys"
   ```

3. Get private key in GitHub secret format:
   ```bash
   cat ~/.ssh/blog_deploy
   # Copy the output (multi-line) into VPS_SSH_KEY secret
   ```

### Testing

After secrets are set:
1. Make a test commit to main
2. Watch GitHub Actions tab to confirm deployment

### Local Deployments

To deploy manually (bypassing GitHub Actions):
```bash
./deploy.sh
```

This shows a diff preview and requires confirmation before pushing.

### Environment Variables

- `SITE_URL`: Set to your actual domain for correct RSS/sitemap URLs. Defaults to `https://yourdomain.com` in CI; override in workflow if needed.
