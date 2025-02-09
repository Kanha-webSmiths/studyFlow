how to initialy setup project (after cloning the project)?

1. install neccecery dependency [npm i] on which side ur working(client or server);
2. if ur working on server side setup .env file just like sample.env
3. install an vsCode extention called "restore terminal"(to running script automatically)
4. after completing above steps just restat vs code or mannualy run scripts to run app

-------------That's it ur good to go now ----------------

rules regarding PRs..

1. do not make randome changes take a feature build it and make a PR with specific commit messege😁.

-------------Happy coding--------------------------

# 🚀 Git Workflow Guide

## 📌 Branching Strategy

### 🔹 1. Main Branches (Long-term)

- **`main`** → Stable, production-ready code (only merge tested code here).
- **`develop`** → Main development branch where features are integrated.

### 🔹 2. Short-Term Branches (Temporary)

- **`feature/<feature-name>`** → For new features (branched from `develop`).
- **`bugfix/<bug-name>`** → For fixing non-critical bugs (branched from `develop`).
- **`hotfix/<hotfix-name>`** → For urgent production fixes (branched from `main`).

---

## 🔄 Workflow Steps

### 🛠️ 1. Start Working on a Feature

```sh
git checkout develop
git pull origin develop
git checkout -b feature/new-dashboard
```

### ✅ 2. Work on the Feature & Commit

```sh
git add .
git commit -m "Added dashboard UI"
git push origin feature/new-dashboard
```

### 🔄 3. Create a Pull Request (PR) to `develop`

- Once reviewed & tested, merge into `develop`.

---

## 🐞 Bug Fix Workflow

### 🔹 1. Create a Bugfix Branch

```sh
git checkout develop
git pull origin develop
git checkout -b bugfix/fix-login-issue
```

### 🔹 2. Work on Fix & Push

```sh
git add .
git commit -m "Fixed login issue"
git push origin bugfix/fix-login-issue
```

### 🔹 3. Merge into `develop` After Review

- After testing, merge back into `develop`.

---

## 🔥 Hotfix Workflow (For Critical Fixes)

### 🔹 1. Create Hotfix Branch from `main`

```sh
git checkout main
git pull origin main
git checkout -b hotfix/fix-payment-bug
```

### 🔹 2. Apply Fix & Merge

```sh
git add .
git commit -m "Fixed payment issue"
git push origin hotfix/fix-payment-bug
```

- **Merge into `main` and tag a release**
- Also **merge back into `develop`** to keep them in sync

---

## 📌 Best Practices

✅ **Pull before you start** (`git pull origin develop`)
✅ **Use clear branch names** (`feature/login-page`, `bugfix/navbar-crash`)
✅ **Small, frequent commits** instead of big ones
✅ **Use Pull Requests (PRs)** for code review
✅ **Tag releases** (`git tag v1.0.0 && git push origin v1.0.0`)

---
