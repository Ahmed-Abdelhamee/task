export interface book {
    logged_date: string
    logged_edition: string
    work: {
        author_keys: string[]
        author_names: string[]
        cover_edition_key: string
        cover_id: number
        edition_key: string[]
        first_publish_year: number
        key: string
        lending_edition_s: string
        title: string
    }
}