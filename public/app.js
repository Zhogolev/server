class Login {
    constructor() {
        this.el = document.createElement('div');
        this.el.className = 'box';
        this.el.style.width = '500px';
        this.el.style.margin = 'auto';
        this.el.style.marginTop = '100px';
    }

    setEvents() {
    	let button = this.el.querySelector('button');

    	button.addEventListener('click', e => {
    		button.disabled = true;
    		button.classList.add('is-loading');
    		let email = this.el.querySelector('[type=email]').value;
    		let password = this.el.querySelector('[type=password]').value;
    		let JSONData = JSON.stringify({ email: email, password: password});
    		console.log(JSONData);

			fetch('http://localhost:3000/api/auth/login', { 
				headers: { 
					'Accept': 'application/json', 
					'Content-Type': 
					'application/json' 
				}, 
				method: 'post', body: JSONData 
			})
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
			})

    	});
    }

    template() {
        return `
			<article class="media">
		        <div class="media-content">
		            <div class="content">
		                <h1>Sign in to your account</h1>
		                <div class="field">
		                    <p class="control">
		                        <input class="input" type="email" placeholder="Email">
		                    </p>
		                </div>
		                <div class="field">
		                    <p class="control">
		                        <input class="input" type="password" placeholder="Password">
		                    </p>
		                </div>
		                <div class="field">
		                    <p class="control">
		                        <button class="button is-dark">
		                            Sign in
		                        </button>
		                    </p>
		                </div>
		            </div>
		        </div>
    		</article>
		`;
    }

    render() {
        this.el.innerHTML = this.template();
        this.setEvents();
        return this;
    }

}

class Table {
    constructor(data = []) {
        this.data = data;
        this.el = document.createElement('table');
        this.el.className = 'table is-hoverable';
        this.el.style.maxWidth = '800px';
        this.el.style.minWidth = '360px';
        this.el.style.margin = 'auto';
        this.el.style.marginTop = '100px';
    }
    template() {
        return `
			<thead><tr><th>Number</th><th>URL</th><th>Start</th><th>Expiration</th></tr></thead>
			<tbody></tbody>
		`;
    }
    rowTemplate(num, data) {
        return `
		<tr>
            <th>${num}</th>
            <td>${data.url}</td>
            <td>${new Date(parseInt(data.start)).toLocaleDateString()}</td>
            <td>${new Date(parseInt(data.expiration)).toLocaleDateString()}</td>
        </tr>
		`;
    }
    render() {
        if (!this.data.length) return this;
        this.el.innerHTML = this.template();
        for (let i = 0; i < this.data.length; i += 1) {
            this.el.querySelector('tbody').insertAdjacentHTML('beforeend', this.rowTemplate(i + 1, this.data[i]));
        }
        return this;
    }
}

document.addEventListener('DOMContentLoaded', e => {
    let path = location.pathname;

    if (path === '/') {
        fetch('http://localhost:3000/api/links')
            .then(response => {
                return response.json()
            })
            .then(data => {
                document.body.append(new Table(data).render().el);
            })
    } else if (path === '/login') {
        document.body.append(new Login().render().el);
    }
});