import './styles.css'

export const CardRepo = ({ title, description, url }) => {
    return (
        <div className='repo-container'>
            <a target='_blank' href={url} rel="noreferrer">
                <strong className='repo-text'>{title}</strong>
            </a>
            <p className='repo-text'>{description}</p>
            <hr />
        </div>
    )
}
