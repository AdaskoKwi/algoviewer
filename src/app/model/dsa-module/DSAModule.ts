export type DSAModule = {
    container: Element
    name: string,
    render(): void,
    buttons: DSAButton[]
}

export type DSAButton = {
    label: string,
    action: () => any
}
