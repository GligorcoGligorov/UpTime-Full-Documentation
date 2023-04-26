<template>


<div class="d-flex cover-container w-100 h-100 mx-auto flex-column">

    
    <header class="d-flex justify-content-between m-4 p-4 ">
        <div class="">
            <h3 class="text-white">Cover</h3>
        </div>
        <div class="d-none d-sm-block">
            <nav class="nav nav-masthead justify-content-center">
                <a class="nav-link fw-bold  active" aria-current="page" href="#">Home</a>
                <a class="nav-link fw-bold " href="#">Features</a>
                <a class="nav-link fw-bold " href="#">Contact</a>
            </nav>
        </div>
        <div class="d-block d-sm-block d-sm-none">
            <svg style="color: white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40"
                zoomAndPan="magnify" viewBox="0 0 30 30.000001" height="40" preserveAspectRatio="xMidYMid meet" version="1.0">
                <defs>
                    <clipPath id="id1">
                        <path
                            d="M 3.386719 7.164062 L 26.613281 7.164062 L 26.613281 22.40625 L 3.386719 22.40625 Z M 3.386719 7.164062 "
                            clip-rule="nonzero" fill="white"></path>
                    </clipPath>
                </defs>
                <g clip-path="url(#id1)">
                    <path fill="white"
                        d="M 3.398438 22.40625 L 26.601562 22.40625 L 26.601562 19.867188 L 3.398438 19.867188 Z M 3.398438 16.054688 L 26.601562 16.054688 L 26.601562 13.515625 L 3.398438 13.515625 Z M 3.398438 7.164062 L 3.398438 9.703125 L 26.601562 9.703125 L 26.601562 7.164062 Z M 3.398438 7.164062 "
                        fill-opacity="1" fill-rule="nonzero"></path>
                </g>
            </svg>
        </div>
    </header>

    
    
    <div class="main px-3 mt-1 mt-sm-5">
        <div>
            <h3 class="text-xl fs-1 textColor">Insert Url to check website</h3>
        </div>
        <div class="div1 p-1 p-sm-3">
            <div class="input-group">
                <span class="input-group-text moreHeight" id="basic-addon3">https://www.example.com</span>
                <input type="text" v-model="this.url" autofocus class="form-control moreHeight" id="basic-url" aria-describedby="basic-addon3">
                <div class="d-block w-100 d-sm-none"></div>

                <!-- <input  class="w-100" type="text" id="input" v-model="url" autofocus> -->
                <button class="btn btn-lg btn-primary fw-bold mx-2 btnWidth rounded-sm" @keyup.enter="getStatusCode()" @click="getStatusCode()" id="btn">Insert</button>  
            </div>
        </div>
        
        <div :class="statusCode == 200 ? 'green' : (statusCode ? 'red' : 'text-white')" class="m-1 m-sm-2">
            <span class="text-xl fs-3">Status Code: {{ statusCode != 200 && statusCode ? '400' : '' }} {{ statusCode }} {{ statusCode == 200 ? 'OK' : '' }} </span>
        </div>
        <div class="m-2">
            <span class="text-xl fs-5 text-white">{{ this.lastUrl }}</span>
        </div>

        <div v-if="showInputs" class="m-3">
            <form >
                <div class="row">
                    <div class="col" v-if="isHtml">
                    <input type="text" v-model="tag" class="form-control" placeholder="Insert Tag" required>
                    </div>
                    <div class="col">
                    <input type="text" v-model="att" class="form-control" placeholder="Insert Attribute" required>
                    </div>
                    <div class="col">
                    <input type="text" v-model="value" class="form-control" placeholder="Value" required>
                    </div>
                </div>
            </form>

            <div class="my-1 my-sm-3 py-2 py-sm-1 d-flex gap-3">
                <button type="button" class="btn btn-primary btn-lg btn-block w-100 btnmargin" @click="checkHtml(htmlString,tag,att,value)">HTML</button>
                <button type="button" class="btn btn-primary btn-lg btn-block w-100 btnmargin" @click="checkApi(htmlString,att,value)">API</button>
            </div>


            <div :class="exist ? 'green' : (!exist && exist != null ? 'red' : 'text-white')" class="m-1 m-sm-2">
            <span class="text-xl fs-3">Exist: {{ exist != null && exist ? 'True' : '' }} {{ exist != null && !exist ? 'False' : '' }}  </span>
        </div>
        </div>

    </div>

    <footer class="fixed-bottom text-white-50 bgColor">
        <p class="m-0 p-2">Cover template for <a href="https://getbootstrap.com/" class="text-white">Bootstrap</a></p>
    </footer>
    
</div>
    
</template>



<script>


export default {
    
    name: 'UpTime',
    data() {
        return {
            url: '',
            statusCode: null,
            lastUrl : '',
            showInputs: false,
            att: '',
            htmlString: '',
            value: '',
            exist: null,
            isHtml: true,
            tag: ''
        
        }
    },
    methods: {
    
        getStatusCode: function() {
            let base_url = "http://localhost:3000";
            base_url = "";
            fetch(`${base_url}/api/getData?url=${this.url}`)
                .then(response => response.json())
                .then(data => {
                    this.statusCode = data.status;
                    if(this.statusCode === 200){
                        this.showInputs = true;
                    }
                    this.lastUrl = this.url;
                    this.url = '';
                    this.htmlString = data.html;
                })
                .catch(error => {
                    console.log(error);
                    if (error.response) {
                        this.statusCode = error.response.status
                    } else {
                        this.statusCode = "An error occurred, no response"
                    }
                });

        },
        
        checkHtml: function(htmlString,tag,att,value) {

            this.isHtml = true;
            this.exist = false;


            if(value === '' || att === '' || tag === ''){
                return
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            const hrefs = doc.querySelectorAll('['+att +']');
            

            
            for(let h of hrefs){
                  
                if(h.tagName.toLowerCase() === tag && h[att].includes(value)){
                    this.exist = true;
                    return 1;
                }
            }

            return 0;
            
        },
        
        checkApi: function(htmlString,att,value2) {

            this.exist = false;
            this.isHtml = false;


            if(value2 === '' || att === ''){
                return
            }

            //https://dog.ceo/api/breeds/image/random
            // https://jsonplaceholder.typicode.com/todos/1
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            const doc2 = doc.body.textContent;
            const jsonObject = JSON.parse(doc2);
            this.exist = false;
            for (let [key,value] of Object.entries(jsonObject)) {
                if(key == att && value == value2){
                    console.log(jsonObject[att] == value2)
                    this.exist = true;

                }
            }

        }  
    },
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#input{
    width: 50%;
}
.red{
    color: red;
    font-weight: bold;
}
.green{
    color: green;
    font-weight: bold;
}

body {
    text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
    height: 100%;
}

.cover-container {
    max-width: 42em;
}

.moreHeight{
    height: 50px !important;
}


/*
 * Header
 */

.nav-masthead .nav-link {
    color: rgba(255, 255, 255, .5);
    border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
    border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link+.nav-link {
    margin-left: 1rem;
}

.nav-masthead .active {
    color: #fff;
    border-bottom-color: #fff;
}
.textColor{
    color: gainsboro;
}
.bgColor{
    background-color: rgba(151, 148, 148, 0.17);
    display: flex;
    justify-content: center;
    align-items: center;
}
.w-50{
    width: 50%;
}

@media (max-width: 576px) {
    .btnWidth {
        width: 100%;
        margin-top: 20px;
    }
    .rounded-sm {
        border-radius: 0.25rem !important;

    }
    .moreHeight {
        height: 70px !important;
    }
    .btn{
        width: 50% !important;
        height: 20% !important;
        display: inline-block;
        margin: 4% auto !important;
    }
    .btnmargin{
        margin: 3% auto !important;


    }
}


</style>
