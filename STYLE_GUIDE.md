# Style Guide

To maintain a consistent and high-quality codebase, please adhere to the following guidelines:

## File Conventions

-   All the files will be a `TypeScript` file (`.ts | .tsx`).
-   Use kebab-case for files (e.g., `my-file.ts`).

## Code Formatting

The repository is loaded with [ESLint](https://github.com/covalenthq/goldrush-decoder/blob/main/eslintrc.json) and [Prettier](https://github.com/covalenthq/goldrush-decoder/blob/main/prettierrc.json) with their own specific configurations. It is **mandatory** to follow these configurations.

```bash
yarn pretty
yarn lint
```

## Variable Names

-   Use meaningful and descriptive variable names.
-   Follow camelCase for variable names (e.g., `myVariable`).

## Typecasting

-   Fully typecast your code using TypeScript.
-   Clearly define the types for variables, function parameters, and explicit return values.

## Comments

-   Include comments for code that might be unclear to others.
-   Use comments sparingly and focus on explaining why, not what (code should be self-explanatory).
-   Follow the [Better Comments](https://bettercomments.com/) convention for improved comment readability.
-   Use different comment styles to convey the significance of comments.

1. // add example comments

## Commit Messages

-   Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) convention for writing commit messages. This convention helps in generating a meaningful changelog and automating versioning.
-   Prefix your commit messages with the relevant type (e.g., "feat(decoder): add new feature", "fix(decoder): resolve bug").
-   Be concise and provide enough information for others to understand the changes.

## Pull Requests

-   Ensure your changes pass the Prettier and ESLint checks before submitting a pull request.
-   Clearly state the purpose and context of your changes in the pull request description.
-   Follow the Pull Request template diligently.

## Testing

-   Include unit tests for new features and bug fixes.
-   Ensure all tests pass before submitting changes.

By following these style guide principles, we can collectively maintain a clean and easily maintainable codebase. Thank you for your commitment to code quality!
