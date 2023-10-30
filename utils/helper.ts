export const getInitials = (name: string) => {
    const words = name.split(' ');
    const initials = words.map((word) => word[0]);
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
export const formatDateBahasa = (inputDate: string) => {
    const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];

    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];
    const today = new Date(inputDate);

    const hari = days[today.getDay()];
    const tanggal = today.getDate();
    const bulan = months[today.getMonth()];
    const tahun = today.getFullYear();

    const result = hari + ", " + tanggal + " " + bulan + " " + tahun;

    return result
}
export const getTodayDateBahasa = () => {
    const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];

    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const today = new Date();

    const hari = days[today.getDay()];
    const tanggal = today.getDate();
    const bulan = months[today.getMonth()];
    const tahun = today.getFullYear();

    const result = hari + ", " + tanggal + " " + bulan + " " + tahun;

    return result
}
export const formatCurrencyIDR = (number: number) => {
    if (number) {
        const formattedIDR = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(number);
        return formattedIDR
    }
    return '-'
}