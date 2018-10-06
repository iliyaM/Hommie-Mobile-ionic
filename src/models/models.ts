export interface AccountInterface {
    value: number,
    date: string,
    icon: string,
    desc: string,
    id: number,
    modifier: string,
}

export interface NotificationInterface {
    date: string,
    time: string,
    content: string,
    icon: string,
    id: number,
    img: string,
    title: null,
    animations: boolean
}