const API_BASE = "http://127.0.0.1:5000/api/";

class Http{
    constructor(path, method, params = null, json=null){
        this.url = API_BASE + path;
        this.method = method;
        this.params = params;
        this.json = json;
        this.headers = {}
    }

    async request(){
        var [data, error] = [null, null];

        if (this.params){
            this.url += new URLSearchParams(this.params).toString();
        }

        if (this.json){
            this.headers['Content-Type'] = 'application/json';
        }

        try{
            var res = await fetch(this.url, {
                method: this.method,
                headers: this.headers,
                credentials: 'include',
                ...(this.json ? {body: JSON.stringify(this.json)}: {}),
            })

            if (res.ok){
                var content_type = res.headers.get('Content-Type');
                if (content_type == "application/json"){
                    data = await res.json();
                }
                else{
                    data = await res.text();
                }
            }
            else{
                error = res.status; 
            }
        }
        catch(e){
            error = e;            
        }

        return {data, error};
    }
}

export default Http;