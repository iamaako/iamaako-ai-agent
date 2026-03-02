# 🤖 Self-Healing CI/CD Agent

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/iamaako/iamaako-ai-agent?style=social)
![GitHub forks](https://img.shields.io/github/forks/iamaako/iamaako-ai-agent?style=social)
![License](https://img.shields.io/github/license/iamaako/iamaako-ai-agent)

**An AI-powered autonomous agent that automatically detects, fixes, and deploys code improvements to your GitHub repositories.**

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🐛 Report Bug](https://github.com/iamaako/iamaako-ai-agent/issues)

</div>

---

## 🎯 Quick Start (3 Steps)

Want to see it in action? Follow these simple steps:

### 1️⃣ Paste Any Public GitHub Repository URL
```
Example: https://github.com/username/repository
```

### 2️⃣ Click "DEPLOY AGENT ▶" Button
Watch the agent analyze your code in real-time!

### 3️⃣ Check Your Pull Request
- Agent will fork your repo
- Create a new branch: `iamaako_ai-fix`
- Detect bugs and issues
- Apply fixes automatically
- Create a Pull Request with all changes

**That's it!** The agent does everything automatically. Just review the PR and merge! 🎉

---

## 🏆 Hackathon Project

**Team Name:** Lone Wolf  
**Built with:** React, TypeScript, Vercel Serverless Functions, GitHub API, AI

---

## 🌟 Overview

The Self-Healing CI/CD Agent is an intelligent automation tool that revolutionizes the way developers handle code quality and bug fixes. Instead of manually reviewing code, identifying issues, and creating fixes, this agent does it all autonomously.

### What Makes It Special?

- **Zero Manual Intervention**: Just provide a repository URL and let the agent do the rest
- **AI-Powered Analysis**: Uses advanced pattern matching for deep code analysis
- **Automatic PR Creation**: Creates well-documented pull requests with all fixes
- **Real-Time Feedback**: Watch the agent work with live logs and progress tracking
- **Serverless Architecture**: Deployed on Vercel for global performance

---

## ✨ Features

### 🔍 Intelligent Code Analysis
- Scans source files automatically
- Detects multiple bug types:
  - Unused imports
  - Syntax errors
  - Type mismatches
  - Logic bugs
  - Indentation issues
  - Linting violations

### 🤖 AI-Powered Fixes
- Pattern-based detection
- Generates human-readable fix explanations
- Applies fixes directly to source code

### 🚀 GitHub Integration
- Automatic repository forking
- Branch creation: `iamaako_ai-fix`
- Commit fixes with descriptive messages
- Pull request creation with detailed reports
- Works with both public and private repositories

### 📊 Real-Time Monitoring
- Live progress tracking through 6 phases
- Detailed execution logs
- CI/CD pipeline simulation
- Performance scoring system

### 🎨 Modern UI
- Cyberpunk-inspired design
- Responsive layout
- CRT screen effects
- Matrix-style animations

---

## 📦 Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher)
- **Git** - [Download](https://git-scm.com/)
- **GitHub Account** - [Sign up](https://github.com/signup)
- **GitHub Personal Access Token** - [Generate](#generating-github-token)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/iamaako/iamaako-ai-agent.git
cd iamaako-ai-agent
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your GitHub token:

```env
GITHUB_TOKEN="ghp_your_token_here"
```

---

## 🔑 Generating GitHub Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name: `Self-Healing CI/CD Agent`
4. Select scope: **repo** (Full control of private repositories)
5. Click **"Generate token"**
6. Copy the token (starts with `ghp_`)
7. Paste it in your `.env` file or Vercel environment variables

---

## 💻 Local Development

### Run Development Server

```bash
# Install Vercel CLI (first time only)
npm install -g vercel

# Run local dev server with serverless functions
npm run dev
```

This starts Vercel dev server:
- Frontend: http://localhost:3000
- API: http://localhost:3000/api/trigger-agent

### Build for Production

```bash
npm run build
```

Builds the app to `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🚀 Deploy to Vercel

### Method 1: One-Click Deploy (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iamaako/iamaako-ai-agent)

1. Click the button above
2. Sign in with GitHub
3. Click "Create"
4. Add environment variable:
   - `GITHUB_TOKEN` = your GitHub token
5. Click "Deploy"
6. Done! 🎉

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 3: GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import `iamaako/iamaako-ai-agent`
4. Add environment variable:
   - `GITHUB_TOKEN` = your token
5. Click "Deploy"

### 🔐 Add Environment Variable on Vercel

1. Go to your project on Vercel
2. Click "Settings" → "Environment Variables"
3. Add:
   - **Name:** `GITHUB_TOKEN`
   - **Value:** `ghp_your_token_here`
   - **Environment:** Select all (Production, Preview, Development)
4. Click "Save"
5. Redeploy if already deployed

---

## 🎮 Usage

1. **Open Your Deployed App**
   - Visit your Vercel URL: `https://your-app.vercel.app`

2. **Enter Repository URL**
   - Format: `https://github.com/username/repository`
   - Works with public and private repos

3. **Optional: Add GitHub Token**
   - If not set in environment variables
   - Allows forking and PR creation

4. **Deploy Agent**
   - Click **"DEPLOY AGENT ▶"**
   - Watch real-time progress

5. **Review Results**
   - View detected issues
   - See applied fixes
   - Access created Pull Request

---

## 🔄 How It Works

```
1. INITIALIZATION
   • Validate repository URL
   • Authenticate with GitHub
   
2. REPOSITORY FORKING
   • Fork to user's account
   • Wait for fork to be ready
   
3. CODE ANALYSIS
   • Fetch repository files
   • Download source code
   • Identify test files
   
4. BUG DETECTION
   • Pattern-based analysis
   • Detect common issues
   • Generate fixes
   
5. BRANCH CREATION
   • Create branch: iamaako_ai-fix
   • Set branch pointer
   
6. APPLY FIXES
   • Commit fixes to branch
   • Add results report
   
7. PULL REQUEST
   • Create PR with fixes
   • Add detailed description
   
8. CI/CD SIMULATION
   • Simulate pipeline runs
   • Calculate performance score
```

---

## 📡 API Documentation

### Endpoint

```
POST /api/trigger-agent
```

### Request Body

```json
{
  "repoUrl": "https://github.com/username/repository",
  "githubToken": "ghp_optional_token"
}
```

### Response

```json
{
  "repoUrl": "https://github.com/username/repository",
  "teamName": "iamaako",
  "leaderName": "iamaako",
  "branchName": "iamaako_ai-fix",
  "prUrl": "https://github.com/username/repository/pull/123",
  "failuresDetected": 7,
  "fixesApplied": 7,
  "cicdStatus": "PASSED",
  "totalTime": 45.2,
  "finalScore": 110,
  "fixes": [...],
  "logs": [...]
}
```

---

## 📁 Project Structure

```
iamaako-ai-agent/
├── api/
│   └── trigger-agent.js      # Vercel serverless function
├── public/                    # Static assets
├── src/
│   ├── components/            # React components
│   ├── hooks/                 # Custom hooks
│   ├── pages/                 # Page components
│   ├── store/                 # State management
│   └── types/                 # TypeScript types
├── .env                       # Environment variables (gitignored)
├── .env.example               # Environment template
├── vercel.json                # Vercel configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

---

## 🐛 Troubleshooting

### Build Failed

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Token Not Working

- Verify token is correct (no extra spaces)
- Check token hasn't expired
- Ensure token has `repo` scope
- Generate new token if needed

### API Timeout on Vercel

- Vercel free tier has 10-second timeout
- Try with smaller repositories (< 20 files)
- Or upgrade to Vercel Pro for 60-second timeout

### Environment Variable Not Found

- Check variable name is exactly `GITHUB_TOKEN`
- Ensure it's added to all environments (Production, Preview, Development)
- Redeploy after adding variables

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Team:** Lone Wolf  
**Developer:** iamaako  
**GitHub:** [@iamaako](https://github.com/iamaako)  
**Repository:** [iamaako-ai-agent](https://github.com/iamaako/iamaako-ai-agent)

---

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful UI components
- **GitHub API** - Repository management
- **Framer Motion** - Smooth animations
- **Vercel** - Serverless deployment
- **Zustand** - State management
- **Vite** - Build tool

---

<div align="center">

**Made with ❤️ by Lone Wolf**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iamaako/iamaako-ai-agent)

</div>
