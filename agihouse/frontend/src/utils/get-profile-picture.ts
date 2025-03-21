/**
 * Generates a deterministic profile picture URL based on a hash of the username.
 * Uses UI Avatars service to create consistent avatar images.
 *
 * @param username - The username to generate an avatar for
 * @returns A URL string for the avatar image
 */
export function getProfilePicture(username: string): string {
  if (!username) return ''

  // Create a simple hash from the username
  const hash = username
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Define a set of more toned down, professional colors inspired by Material UI and Fluent UI
  const colors = [
    '#0078D4', // Microsoft Blue
    '#5C2E91', // Microsoft Purple
    '#107C10', // Microsoft Green
    '#D83B01', // Microsoft Orange
    '#4A5568', // Slate Gray
    '#2B6CB0', // Blue
    '#805AD5', // Purple
    '#38A169', // Green
    '#DD6B20', // Orange
    '#3182CE', // Light Blue
    '#00897B', // Teal
    '#E53E3E', // Red
    '#6B46C1', // Indigo
    '#718096', // Cool Gray
    '#2C7A7B', // Cyan
  ]

  // Use the hash to select a color
  const colorIndex = hash % colors.length
  const backgroundColor = colors[colorIndex]

  // Get initials (up to 2 characters)
  const initials = username
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()

  // Use UI Avatars service to generate the avatar
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${backgroundColor.replace('#', '')}&color=fff&size=256`
}
