export interface bookDetails {
    authors: [{
        author: general_Obj,
        type: general_Obj
    }],
    covers: number[],
    created: {
        type: string,
        value: string
    },
    key: string,
    last_modified: {
        type: string,
        value: string
    },
    latest_revision: number,
    revision: number,
    title: string,
    type: general_Obj
}

export interface general_Obj {
    key: string
}