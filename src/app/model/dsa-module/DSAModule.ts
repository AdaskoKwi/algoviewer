export type DSAModule = {
    name: string,
    render(container: Element): void,
    buttons: DSAButton[]
}

export type DSAButton = {
    label: string,
    action: () => any
}
