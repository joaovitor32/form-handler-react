declare const helper: {
    text: (value: string) => boolean;
    search: (value: string) => boolean;
    password: (value: string) => boolean;
    email: (email: string) => boolean;
    week: (week: string) => boolean;
    number: (number: string) => boolean;
    time: (time: string) => boolean;
    range: (range: string) => boolean;
    color: (color: string) => boolean;
    month: (month: string) => boolean;
    date: (date: string) => boolean;
    tel: (telephone: string) => boolean;
    url: (url: string) => boolean;
    'datetime-local': (datetime: string) => boolean;
    checkbox: (value: any) => boolean;
    radio: (value: any) => boolean;
};
export default helper;
