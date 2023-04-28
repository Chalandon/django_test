export function Companies({data, fly_to}) {

    function show_companies() {
        if (data) {
            return data.features.map(
                el => <li onClick={fly_to.bind(null, el)} key={el.properties.title} >{el.properties.title}</li>
            )
        }
    }

    return (
        <div style={{marginRight: '100px'}}>
            <h3>Companies</h3>
            <ul style={{listStyle: 'none', padding: '0px' }} >{ show_companies() }</ul>
        </div>
    )
}
