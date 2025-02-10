export const DB_NAME="studyFlow"

export const userRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
};
export const authProvider = {
  EMAIL: "EMAIL",
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB"
}
export const badgeType = {
  ACHIEVEMENT: "ACHIEVEMENT",
  ENGAGEMENT: "ENGAGEMENT",
  PERFORMANCE: "PERFORMANCE",
  SPECIAL: "SPECIAL"
}


export const availableBadgeType = Object.values(badgeType);
export const availableAuthProvider = Object.values(authProvider);
export const availableUserRoles = Object.values(userRolesEnum);
