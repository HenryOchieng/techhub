export const formatKenyanDateTime = (date) => {
    if (!date) return "N/A"

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) return "N/A"

    return new Intl.DateTimeFormat("en-KE", {
        timeZone: "Africa/Nairobi",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    }).format(parsedDate)
}