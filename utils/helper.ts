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
    const date = new Date(inputDate)
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    return formatter.format(date)
}