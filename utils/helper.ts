export const getInitials = (name: string) => {
    // Split the name into words
    const words = name.split(' ');

    // Extract the first character from each word
    const initials = words.map((word) => word[0]);

    // Join the initials and limit to the first 2 characters
    const result = initials.join('').slice(0, 2);

    return result;
}
export const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return formatter.format(date);
}
export const formatBirthDate = (inputDate: string) => {
    const originalDate = new Date(inputDate)
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`
}
export const formatBackendBirthDate = (inputDate: any) => {
    const date = new Date(inputDate)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}