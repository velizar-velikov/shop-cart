export default function NoProducts({ search }) {
    const areAll = search.category == 'All categories' && search.name == '';

    return (
        <p className="position-absolute top-50 start-50 translate-middle fs-1 px-3 py-2 px-lg-5 py-lg-3 rounded bg-dark-subtle">
            {`${areAll ? 'No clothes yet.' : 'No match found.'}`}
        </p>
    );
}
