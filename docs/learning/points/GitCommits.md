---
title: 🐢Git提交类型
createTime: 2025/01/14 16:03:03
tags:
  - Git
permalink: /article/77o0qn29/
---

# Git 提交信息规范（Conventional Commits）

在开发中使用一致的 Git 提交信息格式有助于提高团队协作效率，清晰地记录每个提交的目的和内容。以下是一些常见的提交类型（commit types），这些类型帮助明确每个提交的意义，并确保项目的版本历史清晰、易于管理。

## 提交类型列表

### 1. **`feat`** (Feature)
- **定义**：用于表示引入了一个新功能或功能增强。
- **示例**：`feat: add user authentication feature`
- **用途**：每当你实现一个新的功能模块或对现有功能进行显著增强时，使用 `feat` 类型。

### 2. **`fix`** (Bug Fix)
- **定义**：用于表示修复了一个 bug 或问题。
- **示例**：`fix: resolve login issue when using incorrect credentials`
- **用途**：每当修复代码中的错误或不正常行为时，使用 `fix` 类型。

### 3. **`docs`** (Documentation)
- **定义**：用于更新项目文档（如 `README.md`、API 文档等），而不涉及代码变更。
- **示例**：`docs: update README with new installation instructions`
- **用途**：更新项目的文档或其他说明性文件时使用。

### 4. **`style`** (Code Style)
- **定义**：用于表示修改了代码的格式（如缩进、空格、分号等），但不影响代码的功能。
- **示例**：`style: format code according to ESLint rules`
- **用途**：主要用于改善代码风格，不会修改代码逻辑。

### 5. **`refactor`** (Code Refactoring)
- **定义**：用于表示对现有代码的重构，不改变其功能，但可能改善了代码的可读性、结构或性能。
- **示例**：`refactor: simplify user data validation logic`
- **用途**：当你对代码进行了重构以提升其质量或可维护性，但不涉及功能修改时，使用 `refactor`。

### 6. **`perf`** (Performance)
- **定义**：用于表示代码优化，提升了性能（例如，减少了加载时间或降低了内存消耗）。
- **示例**：`perf: improve image loading speed by lazy loading`
- **用途**：每当你对性能进行优化时，使用 `perf` 类型。

### 7. **`test`** (Testing)
- **定义**：用于表示添加或修改了测试代码。
- **示例**：`test: add unit tests for authentication logic`
- **用途**：增加、修改、修复测试代码时使用。

### 8. **`chore`** (Chores)
- **定义**：用于表示一些杂项任务，例如更新构建工具、配置文件、依赖项更新等，通常不会影响源代码功能。
- **示例**：`chore: update dependencies to latest versions`
- **用途**：进行一些非业务代码的修改，比如构建工具、依赖更新、构建优化等。

### 9. **`build`** (Build System)
- **定义**：用于表示与构建系统相关的更改，例如构建脚本、依赖项的更新等。
- **示例**：`build: add webpack configuration for production build`
- **用途**：与构建相关的更改。

### 10. **`ci`** (Continuous Integration)
- **定义**：用于表示与持续集成（CI）相关的更改，例如更新 CI 配置文件、修复 CI 流程中的问题等。
- **示例**：`ci: update GitHub Actions workflow for testing`
- **用途**：用于修改 CI 配置文件或修复 CI 相关的问题。

### 11. **`revert`** (Revert Changes)
- **定义**：用于表示撤销一个已经提交的修改，恢复到之前的状态。
- **示例**：`revert: undo feature branch changes due to bugs`
- **用途**：当你需要撤销某个提交时使用 `revert`，它会自动创建一个新的提交来撤销原来的更改。

### 12. **`merge`** (Merge)
- **定义**：用于表示一次合并提交，通常在分支合并时使用。
- **示例**：`merge: merge feature/login into main`
- **用途**：用于分支合并，表示本次提交是合并操作。

---

## 提交信息格式

提交信息通常遵循以下结构：

```
<type>(<scope>): <message>
```

- **`<type>`**：提交类型（如 `feat`、`fix` 等）。
- **`<scope>`**：可选项，表示更改的范围或模块（例如，`auth`、`login`、`UI` 等）。
    - 例如，`feat(auth)` 表示与认证相关的功能变更。
- **`<message>`**：简短描述本次提交的目的和内容。

### 示例

- `feat(auth): add login functionality`
- `fix(header): fix bug causing header misalignment`
- `chore(deps): update React to v18`
- `docs: update API documentation for user registration`
- `refactor: improve login logic readability`

---

## 总结

采用 **Git 提交信息规范** 可以显著提高团队协作效率，使得版本历史更加清晰、有序，便于后续查阅和维护。通过使用标准的提交类型（如 `feat`、`fix`、`docs` 等），开发人员可以快速理解每个提交的目的和内容，进而更好地进行代码回滚、版本发布等操作。

---