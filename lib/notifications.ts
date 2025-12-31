export interface NotificationPayload {
  type: "donation-claimed" | "new-donation" | "donation-ready" | "system"
  userId: string
  title: string
  message: string
  relatedDonationId?: string
}

// Mock notification service - replace with real service in production
export const createNotification = async (payload: NotificationPayload) => {
  // In production, this would call an API endpoint
  console.log("[v0] Creating notification:", payload)

  return {
    id: Math.random().toString(36).substr(2, 9),
    ...payload,
    read: false,
    createdAt: new Date().toISOString(),
  }
}

// Notify receptor when donation becomes available
export const notifyNewDonation = async (userId: string, donationTitle: string, donationId: string) => {
  return createNotification({
    type: "new-donation",
    userId,
    title: "New Donation Available",
    message: `${donationTitle} is now available near you`,
    relatedDonationId: donationId,
  })
}

// Notify donor when donation is claimed
export const notifyDonationClaimed = async (
  userId: string,
  claimedByName: string,
  donationTitle: string,
  donationId: string,
) => {
  return createNotification({
    type: "donation-claimed",
    userId,
    title: "Donation Claimed!",
    message: `Your donation "${donationTitle}" has been claimed by ${claimedByName}`,
    relatedDonationId: donationId,
  })
}

// Notify receptor when donation is ready for pickup
export const notifyDonationReady = async (
  userId: string,
  donationTitle: string,
  address: string,
  donationId: string,
) => {
  return createNotification({
    type: "donation-ready",
    userId,
    title: "Donation Ready",
    message: `Your claimed donation "${donationTitle}" is ready for pickup at ${address}`,
    relatedDonationId: donationId,
  })
}

// Generic system notification
export const sendSystemNotification = async (userId: string, title: string, message: string) => {
  return createNotification({
    type: "system",
    userId,
    title,
    message,
  })
}
