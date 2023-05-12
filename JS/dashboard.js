let arr = []
let id = ""

let cartid=''
$(document).ready(
    async function () {
        await $.ajax({
            type: "GET",
            url: `http://localhost:5453/api/v1/bookstore?search=&sort=""&order=as&page=&limit=100`,
            success: function (res) {
                let img = ""
                arr = res.data
                for (let i = 0; i < res.data.length; i++) {
                    // console.log(res.data[i]);
                    (res.data[i].bookImage == null) ? img = "/Assets/Image 10.png" : img = res.data[i].bookImage
                    const abc = `
                        <div id="bookview" onclick="showbook('${res.data[i].bookName}','${res.data[i].author}','${res.data[i].price}','${img}','${res.data[i].description}','${res.data[i]._id}')">
                        <div id="bookimgcont"><img src="${img}"></div>
                        <div class="ml5">${res.data[i].bookName}</div>
                        <div class="ml5">By ${res.data[i].author}</div>
                        <div id="reviewrating">4.5<img src="/Assets/icons8-christmas-star-24.png"></div>
                        <div class="ml5">RS. ${res.data[i].price}</div>
                    </div>`;
                    $("#allbook").append(abc);
                }

            },
            error: function (error) {
                console.log(error.responseJSON);
            },
        });
        document.getElementById("bookdetails").style.display = "none"
        document.getElementById("wishlistcont").style.display = "none"
        document.getElementById("cartcont").style.display = "none"
        document.getElementById("orderdetails").style.display = "none"
        document.getElementById("congratulationscont").style.display = "none"


        localStorage.setItem("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhdGVuZHJhMTIzQGdtYWlsLmNvbSIsImlkIjoiNjQ1MmE5OTBhMmRiNzUyZTUwMjNiY2MxIiwiaWF0IjoxNjgzNjMzMDYwfQ.drVwJEow0GylhQCTwDsZXfUh5OhTbN_a--v_hCdbm4o")


        let token = localStorage.getItem("token")


        await $.ajax({
            type: "GET",
            url: `http://localhost:5453/api/v1/wishlist`,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (res) {
                let img = ""
                for (let i = 0; i <= res.data.length; i++) {
                    // console.log(res.data);
                    (res.data[i].bookImage == null) ? img = "/Assets/Image 10.png" : img = res.data[i].bookImage
                    const abc = `
                        <div id="bookview" >
                        <div id="bookimgcont"><img src="${img}"></div>
                        <div class="ml5">${res.data[i].bookName}</div>
                        <div class="ml5">By ${res.data[i].author}</div>
                        <div id="reviewrating">4.5<img src="/Assets/icons8-christmas-star-24.png"></div>
                        <div class="ml5">RS. ${res.data[i].price}</div>
                         <div class="ml5" id="removebtn" onclick="wishlistremoval('${res.data[i].productID}')"> <button>Remove from wishlist</button></div>  
                    </div>`;
                    $("#wishlist").append(abc);
                }

            },
            error: function (error) {
                console.log(error.responseJSON);
            },
        });


        await $.ajax({
            type: "GET",
            url: `http://localhost:5453/api/v1/cart`,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (res) {
                let img = ""
                // console.log(res.data);
                cartid=res.data._id
                document.getElementById("totalcart").innerHTML = "RS." + res.data.cartTotal

                for (let i = 0; i <= res.data.books.length; i++) {

                    (res.data.books[i].bookImage == null) ? img = "/Assets/Image 10.png" : img = res.data[i].bookImage
                    const abc = `
                    <div id="mycart">
                    <div id="cartandlocation">
                        <div id="boxTitle">My Cart</div>
                        <div id="location">
                            <img src="/Assets/location.png" height="80%" />
                            <div>Use current location</div>
                            <img src="/Assets/dropdown.png" height="50%" />
                        </div>
                    </div>
                    <div id="mycartdetails1">
                        <div id="imgdiv"> <img src="/Assets/Image 11@2x.png" height="100px"></div>
                        <div id="mycartdetails1bookdetails">
                            <div id="bookname">${res.data.books[i].bookName}</div>
                            <div id="authorname">${res.data.books[i].author}</div>
                            <div id="pricetag">${res.data.books[i].price}</div>
                            <div id="cartaddremoveapicall">
                                <div style="display: flex;height: 100%; width: 60%;justify-content: space-around;">
                                    <div class="incdesbtn" id="minusSign" onclick="removefromcart('${res.data.books[i].productID}')">-</div>
                                    <div id="count">${res.data.books[i].quantity}</div>
                                    <div class="incdesbtn"  onclick="addtocart('${res.data.books[i].productID}')">+</div>
                                </div>

                            </div>    
                        </div>
                    </div>
                </div>`;
                    $("#cartitem").append(abc);
                }

            },
            error: function (error) {
                console.log(error.responseJSON);
            },
        });
    }

);


function showbook(name, author, price, img, des, ID) {
    id = ID
    // console.log(name,author,price,img,des)
    document.getElementById("bookdetails").style.display = "flex"
    document.getElementById("wishlistcont").style.display = "none"
    document.getElementById("allbookcont").style.display = 'none'
    document.getElementById("cartcont").style.display = "none"
    document.getElementById("orderdetails").style.display = "none"
    document.getElementById("congratulationscont").style.display = "none"
    document.getElementById("smallimg").src = img
    document.getElementById("bigimg").src = img
    document.getElementById("bookname").innerHTML = name
    document.getElementById("authorname").innerHTML = author
    document.getElementById("pricetag").innerHTML = "RS." + price
    document.getElementById("detailswindow").innerHTML = des
}

function cart() {
    console.log("cart called");
    document.getElementById("orderdetails").style.display = "flex"
    document.getElementById("wishlistcont").style.display = "none"
    document.getElementById("allbookcont").style.display = 'none'
    document.getElementById("bookdetails").style.display = 'none'
    document.getElementById("cartcont").style.display = "none"
    document.getElementById("congratulationscont").style.display = "none"

}

function wishlist() {
    console.log("wishlist called");
    document.getElementById("wishlistcont").style.display = "flex"
    document.getElementById("allbookcont").style.display = 'none'
    document.getElementById("bookdetails").style.display = 'none'
    document.getElementById("cartcont").style.display = "none"
    document.getElementById("orderdetails").style.display = "none"
    document.getElementById("congratulationscont").style.display = "none"
}
async function wishlistremoval(id) {
    console.log("removal of wishlist");
    event.preventDefault();
    let token = localStorage.getItem("token")
    await $.ajax({
        type: "POST",
        url: `http://localhost:5453/api/v1/wishList/remove/${id}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            console.log(res)

        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });

    location.reload()
    return false;
}
async function wishlistadd() {
    console.log("add of wishlist" + id);
    event.preventDefault();
    let token = localStorage.getItem("token")
    await $.ajax({
        type: "POST",
        url: `http://localhost:5453/api/v1/wishList/add/${id}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });

    location.reload()
    return false;
}
function BookStore() {
    window.location.href = "http://127.0.0.1:5500/HTML/dashboard.html";
}


async function removefromcart(removeid) {
    console.log("remove from cart" + removeid);
    event.preventDefault();
    let token = localStorage.getItem("token")
    await $.ajax({
        type: "POST",
        url: `http://localhost:5453/api/v1/cart/remove/${removeid}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });

    location.reload()
    return false;

}
async function addtocart(addid) {
    if (addid == undefined) {
        addid = id
    }
    console.log("add to cart" + addid);
    event.preventDefault();
    let token = localStorage.getItem("token")
    await $.ajax({
        type: "POST",
        url: `http://localhost:5453/api/v1/cart/add/${addid}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });

    location.reload()
    return false;

}
async function createaddress(){
    let name=$('#firstnameinput').val()
    let phoneNumber=$('#mobileno').val()
    let fullAddress=$('#addressinput').val()
    let locality=$('#locality').val()
    let state=$('#state').val()

    let obj={
        "name": name,
        "phoneNumber": phoneNumber,
        "addressType": "Home",
        "fullAddress":fullAddress,
        "landmark": "----",
        "state": state,
        "pinCode": "000000",
        "locality": locality
    }
    let token = localStorage.getItem("token")
    await $.ajax({
        type: "POST",
        url: `http://localhost:5453/api/v1/customerDetails/`,
        data: obj,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });

    document.getElementById('summary').style.display='flex'

}

async function checkout(){
    console.log(cartid);
    let token = localStorage.getItem("token")
    await $.ajax({
        type: "POST",
        url: `http://localhost:5453/api/v1/cart/purchased/${cartid}`,

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });

    document.getElementById("wishlistcont").style.display = "none"
    document.getElementById("allbookcont").style.display = 'none'
    document.getElementById("bookdetails").style.display = 'none'
    document.getElementById("cartcont").style.display = "none"
    document.getElementById("orderdetails").style.display = "none"
    document.getElementById("congratulationscont").style.display = "flex"



}