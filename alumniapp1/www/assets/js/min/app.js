// Initialize constructor
var studentinfo = new Student_infomation();
var studentid = "1360001";
var mapCanvas;
var pos;
var cpos;

function takePhoto() {
    navigator.camera.getPicture(onCameraSuccess, onCameraFail, { quality: 75,
    destinationType: Camera.DestinationType.FILE_URL,allowEdit : true, targetWidth: 320, targetHeight: 320});
}

function onCameraSuccess(imageURI) {
    console.log(JSON.stringify(imageURI));
    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
    console.log(imageURI);
}

function onCameraFail(message) {
    console.log('Failed because: ' + message);
}

function Campaign(id,name,description,images,subimages,subdescription,status,owner,createon,used) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.images = images;
    this.subimages = subimages;
    this.subdescription = subdescription;
    this.status = status;
    this.owner = owner;
    this.createon = createon;
    this.used = used;
}

function Student_infomation(id,student_id,student_class,initname,firstname,lastname,middlename,birthday,email,gender,occupation,address,address_1,home_lat,home_lng,postcode,country,nationality,race,marriage_status,age,avatar,mainpic) {
    this.id = id;
    this.student_id = student_id;
    this.student_class = student_class;
    this.initname = initname;
    this.firstname = firstname;
    this.lastname = lastname;
    this.middlename = middlename;
    this.birthday = birthday;
    this.email = email;
    this.gender = gender;
    this.occupation = occupation;
    this.address = address;
    this.address_1 = address_1;
    this.home_lat = home_lat;
    this.home_lng = home_lng;
    this.postcode = postcode;
    this.country = country;
    this.map = 0;
    this.nationality = nationality;
    this.race = race;
    this.marriage_status = marriage_status;
    this.age = age;
    this.avatar = avatar;
    this.mainpic = mainpic;
    
}

function prysetting(privacyattr, objitem, attr_name) {
    console.log("start");
    //console.log(privacyattr);

    if (ifexist(privacyattr.data,"attribute_name",attr_name)) {
            console.log("attribute exist");
            // console.log(privacyattr.data);
            if (privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].value == 1) {

            } else if (privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].value == 2) {
                console.log('set to slash');
                $('#'+objitem).removeClass('fa fa-eye fa-2x');
                $('#'+objitem).addClass('fa fa-eye-slash fa-2x');
            }
        }  

        $('#'+objitem).on('click', function(privacyattr, objitem, attr_name){
            // console.log(privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)]);
            // console.log(findindex(privacyattr.data,"attribute_name","email"));
            if ((ifexist(privacyattr.data,"attribute_name",attr_name)))  {
                if  (privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].value == 1) { 
                    $('#'+objitem).removeClass('fa fa-eye fa-2x');
                    $('#'+objitem).addClass('fa fa-eye-slash fa-2x');
                    privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].value = 2;
                    $.ajax({
                        type: "POST",
                        dataType: "html",
                        url: "http://103.27.201.113/alumni/json/updatepry.php", //Relative or absolute path to response.php file
                        data: { "mid" : privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].mid, "aid" : privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].aid , "value" : 2 },
                        success: function(data) {
                            console.log(data)
                        }

                    }); 
                } else {
                $('#'+objitem).removeClass('fa fa-eye-slash fa-2x');
                $('#'+objitem).addClass('fa fa-eye fa-2x');
                privacyattr.data[findindex(privacyattr.data,"attribute_name","email")].value = 1;
                    $.ajax({
                        type: "POST",
                        dataType: "html",
                        url: "http://103.27.201.113/alumni/json/updatepry.php", //Relative or absolute path to response.php file
                        data: { "mid" : privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].mid, "aid" : privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].aid , "value" : 1 },
                        success: function(data) {
                            console.log(data)
                        }

                    });
                }
                 
            } else {
                
                console.log(privacyattr)
                console.log(privacyattr.data)
                console.log(attr_name);
                console.log(privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)])
                console.log(findindex(privacyattr.data,"attribute_name",attr_name))
                $('#'+objitem).removeClass('fa fa-eye fa-2x');
                $('#'+objitem).addClass('fa fa-eye-slash fa-2x');
                privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].value = 2;
                $.ajax({
                    type: "POST",
                    dataType: "html",
                    url: "http://103.27.201.113/alumni/json/updatepry.php", //Relative or absolute path to response.php file
                    data: { "mid" : privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].mid, "aid" : privacyattr.data[findindex(privacyattr.data,"attribute_name",attr_name)].aid , "value" : 2 },
                    success: function(data) {
                        console.log(data)
                    }

                });   
            }
        }(privacyattr, objitem, attr_name));
    
}

function onMapSuccess(pos) {

    map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    cpos = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
    studentinfo.home_lat = pos.coords.latitude;
    studentinfo.home_lng = pos.coords.longitude;
    //console.log(cpos);
    //console.log(studentinfo);
    $('#txthome_lat').val(readJSON(studentinfo.home_lat));
    $('#txthome_lng').val(readJSON(studentinfo.home_lng));
    console.log(cpos);
    var homemarker = addMarker(cpos,map);
    return cpos;
}

function addMarker(myLatLng, map) {
    var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
    
    });
    return marker;
}

function setHomeLatLng() {

}

function geoshowError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

function initialize(lat,lng,map) {
        mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(mapCanvas, mapOptions);
        console.log(map);
        return map;
}


function convertdate(data) {
    var syear;
    var smonth;
    var sdate;
    syear = data.substring(0,4);
    smonth = data.substring(5,7);
    sdate = data.substring(8,10)
    return smonth+"/"+sdate+"/"+syear;
}
function findvalue(arrayobject,prop,value) {
    var result = [];
    for (var i=0; i<arrayobject.length; i++) {
        //console.log(arrayobject);
        //console.log(prop)
        //console.log(value)
        //console.log(arrayobject[i][prop]) 
        if (arrayobject[i][prop] == value) {
            result.push(arrayobject[i]);
        }
    }
    return result;
}

function findindex(arrayobject,prop,value) {
    var result = [];
    for (var i=0; i<arrayobject.length; i++) {
        // console.log(arrayobject);
        console.log("attribute :"+i+":"+arrayobject[i][prop]) 
        if (arrayobject[i][prop] == value) {
            return i;
            exit();
        } else {
            return -1;
            exit();
        }
    }
    
}

function readJSON(obj) {
    return decodeURI(obj).replace(/\%3A/g,':').replace(/\+/g,' ').replace(/\%40/g,'@').replace(/\%2F/g,'/')
}
function ifexist(arrayobject,prop,value) {
    var result = [];
    for (var i=0; i<arrayobject.length; i++) {
        // console.log(arrayobject);
        // console.log(arrayobject[i][prop]) 
        if (arrayobject[i][prop] == value) {
            return 1;
            exit();
        } else {
            return 0;
            exit();
        }
    }
    
}
// Initialize app
function naxvarBg() {
    var navbar = $(".navbar-clear"), box = null, cls = "active";
    return 0 === navbar.length ? !1 : (box = navbar.next().find($(".page-on-center").length > 0 ? ".page-on-center .page-content" : ".page .page-content"), 
    box.scrollTop() > 10 ? navbar.addClass(cls) : navbar.removeClass(cls), void box.scroll(function() {
        $(this).scrollTop() > 40 ? navbar.addClass(cls) : navbar.removeClass(cls);
    }));
}

function showLineChart(obj) {
    var data = {
        labels: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
        datasets: [ {
            label: "My dataset",
            fillColor: fillColor,
            strokeColor: strokeColor,
            pointColor: pointColor,
            pointStrokeColor: pointStrokeColor,
            pointHighlightFill: pointHighlightFill,
            pointHighlightStroke: pointHighlightStroke,
            data: [ 65, 59, 80, 81, 56, 55, 40 ]
        } ]
    }, chart = new Chart(obj).Line(data, {
        responsive: !0,
        pointDotRadius: 5,
        pointDotStrokeWidth: 2,
        datasetStrokeWidth: 2,
        scaleFontSize: 10,
        tooltipFontSize: 12,
        scaleLineColor: "rgba(0, 0, 0, 0.1)",
        scaleBeginAtZero: !0,
        scaleShowGridLines: !0,
        scaleShowHorizontalLines: !0,
        scaleShowVerticalLines: !1
    });
    return chart;
}

function showLineChartPage(obj) {
    var data = {
        labels: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
        datasets: [ {
            label: "My dataset",
            fillColor: fillColor,
            strokeColor: strokeColor,
            pointColor: pointColor,
            pointStrokeColor: pointStrokeColor,
            pointHighlightFill: pointHighlightFill,
            pointHighlightStroke: pointHighlightStroke,
            data: [ 65, 59, 80, 81, 56, 55, 40 ]
        }, {
            label: "My dataset 2",
            fillColor: fillColor2,
            strokeColor: strokeColor2,
            pointColor: pointColor2,
            pointStrokeColor: pointStrokeColor2,
            pointHighlightFill: pointHighlightFill2,
            pointHighlightStroke: pointHighlightStroke2,
            data: [ 32, 34, 67, 12, 37, 55, 20 ]
        } ]
    }, chart = new Chart(obj).Line(data, {
        responsive: !0,
        pointDotRadius: 5,
        pointDotStrokeWidth: 2,
        datasetStrokeWidth: 2,
        scaleFontSize: 10,
        tooltipFontSize: 12,
        scaleLineColor: "rgba(0, 0, 0, 0.1)",
        scaleBeginAtZero: !0,
        scaleShowGridLines: !0,
        scaleShowHorizontalLines: !0,
        scaleShowVerticalLines: !1
    });
    return chart;
}

function showBarChartPage(obj) {
    var data = {
        labels: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
        datasets: [ {
            label: "My dataset",
            fillColor: fillColor,
            strokeColor: strokeColor,
            pointColor: pointColor,
            pointStrokeColor: pointStrokeColor,
            pointHighlightFill: pointHighlightFill,
            pointHighlightStroke: pointHighlightStroke,
            data: [ 65, 59, 80, 81, 56, 55, 40 ]
        }, {
            label: "My dataset 2",
            fillColor: fillColor2,
            strokeColor: strokeColor2,
            pointColor: pointColor2,
            pointStrokeColor: pointStrokeColor2,
            pointHighlightFill: pointHighlightFill2,
            pointHighlightStroke: pointHighlightStroke2,
            data: [ 32, 34, 67, 12, 37, 55, 20 ]
        } ]
    }, chart = new Chart(obj).Bar(data, {
        responsive: !0,
        pointDotRadius: 6,
        pointDotStrokeWidth: 2,
        datasetStrokeWidth: 2,
        scaleFontSize: 10,
        tooltipFontSize: 12,
        scaleLineColor: "rgba(0, 0, 0, 0.1)",
        scaleBeginAtZero: !0,
        scaleShowGridLines: !0,
        scaleShowHorizontalLines: !0,
        scaleShowVerticalLines: !1
    });
    return chart;
}

function showPieChartPage(obj) {
    var data = [ {
        value: 300,
        color: pointColor,
        highlight: pointColorHighlight,
        label: "Text 1"
    }, {
        value: 50,
        color: pointColor2,
        highlight: pointColorHighlight2,
        label: "Text 2"
    }, {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Text 3"
    } ], chart = new Chart(obj).Pie(data, {
        responsive: !0,
        tooltipFontSize: 12
    });
    return chart;
}

function showDoughnutChartPage(obj) {
    var data = [ {
        value: 300,
        color: pointColor,
        highlight: pointColorHighlight,
        label: "Text 1"
    }, {
        value: 50,
        color: pointColor2,
        highlight: pointColorHighlight2,
        label: "Text 2"
    }, {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Text 3"
    } ], chart = new Chart(obj).Doughnut(data, {
        responsive: !0,
        tooltipFontSize: 12
    });
    return chart;
}

function showRadarChartPage(obj) {
    var data = {
        labels: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
        datasets: [ {
            label: "My dataset",
            fillColor: fillColor,
            strokeColor: strokeColor,
            pointColor: pointColor,
            pointStrokeColor: pointStrokeColor,
            pointHighlightFill: pointHighlightFill,
            pointHighlightStroke: pointHighlightStroke,
            data: [ 65, 59, 80, 81, 56, 55, 40 ]
        }, {
            label: "My dataset 2",
            fillColor: fillColor2,
            strokeColor: strokeColor2,
            pointColor: pointColor2,
            pointStrokeColor: pointStrokeColor2,
            pointHighlightFill: pointHighlightFill2,
            pointHighlightStroke: pointHighlightStroke2,
            data: [ 32, 34, 67, 12, 37, 55, 20 ]
        } ]
    }, chart = new Chart(obj).Radar(data, {
        responsive: !0,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        datasetStrokeWidth: 2,
        scaleFontSize: 10,
        tooltipFontSize: 12,
        scaleLineColor: "rgba(0, 0, 0, 0.1)",
        scaleBeginAtZero: !0,
        scaleShowGridLines: !0,
        scaleShowHorizontalLines: !0,
        scaleShowVerticalLines: !1
    });
    return chart;
}

function showPolarChartPage(obj) {
    var data = [ {
        value: 300,
        color: pointColor,
        highlight: pointColorHighlight,
        label: "Text 1"
    }, {
        value: 50,
        color: pointColor2,
        highlight: pointColorHighlight2,
        label: "Text 2"
    }, {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Text 3"
    } ], chart = new Chart(obj).PolarArea(data, {
        responsive: !0,
        scaleFontSize: 10,
        tooltipFontSize: 12
    });
    return chart;
}



var myApp = new Framework7({
    swipeBackPage: !1,
    pushState: !0,
    swipePanel: "left",
    modalTitle: "Title"
}), $$ = Dom7;

$$("body").on("click", ".js-add-to-fav", function() {
    myApp.alert("You love this post!", "");
});

var mainView = myApp.addView(".view-main", {
    dynamicNavbar: !0
});

document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
        console.log(navigator.camera);
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
}

$$(".popup-splash").on("opened", function() {
    myApp.swiper(".swiper-container", {
        speed: 400,
        pagination: ".swiper-pagination",
        paginationBulletRender: function(index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        }
    });
}), $$(document).on("pageAfterAnimation", function(e) {
    if ($(".page-on-center .chart-content").length > 0) {
        var ctx = document.querySelector(".page-on-center .chart-content").getContext("2d");
        showLineChart(ctx);
    }
    if ($(".page-on-center .line-chart-content").length > 0) {
        var ctx = document.querySelector(".page-on-center .line-chart-content").getContext("2d");
        showLineChartPage(ctx);
    }
    if ($(".page-on-center .bar-chart-content").length > 0) {
        var ctx = document.querySelector(".page-on-center .bar-chart-content").getContext("2d");
        showBarChartPage(ctx);
    }
    if ($(".page-on-center .pie-chart-content").length > 0) {
        var ctx = document.querySelector(".page-on-center .pie-chart-content").getContext("2d");
        showPieChartPage(ctx);
    }
    if ($(".page-on-center .doughnut-chart-content").length > 0) {
        var ctx = document.querySelector(".page-on-center .doughnut-chart-content").getContext("2d");
        showDoughnutChartPage(ctx);
    }
    if ($(".page-on-center .radar-chart-content").length > 0) {
        var ctx = document.querySelector(".page-on-center .radar-chart-content").getContext("2d");
        showRadarChartPage(ctx);
    }
    if ($(".page-on-center .polar-chart-content").length > 0) {
        var ctx = document.querySelector(".page-on-center .polar-chart-content").getContext("2d");
        showPolarChartPage(ctx);
    }
    naxvarBg();
}), $$(document).on("pageInit", function(e) {



    var page = e.detail.page;
	console.log(page.name)
    var campaign = [];
    var tmpcampaign = "";
    

    $(".zoom").swipebox(), $(".navbar").removeClass("navbar-clear"), ("index" === page.name || "menu" === page.name || "login" === page.name || "dashboard-1" === page.name || "panel" === page.name) && $(".navbar").addClass("navbar-clear"), 
    $(".twitter-content").length > 0 && $(".twitter-content").twittie({
        count: 10
    }), $(".tweet").length > 0 && $(".tweet").twittie({
        count: 1
    }), $(".flickr-content").length > 0 && $(".flickr-content").jflickrfeed({
        limit: 15,
        qstrings: {
            id: "44244432@N03"
        },
        itemTemplate: '<li><a href="{{image_m}}" class="flickr"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
    }, function(data) {
        $(".flickr-content li a").swipebox();
    }), $(".js-validate").length > 0 && $("body").on("click", ".js-form-submit", function() {
        var form = $(this).parents("form"), valid = form.valid();
        if ("contact" === page.name && valid) {
            var data = form.serializeObject();
            myApp.showPreloader(), $.post("/email.php", data).done(function(data) {
                myApp.hidePreloader();
                var response = JSON.parse(data);
                response.error ? myApp.alert(response.msg, "") : (myApp.alert(response.msg, ""), 
                form.find("input[type=text], input[type=email], textarea").val(""));
            });
        }
    });
    // Conversation flag
    var conversationStarted = !1, myMessages = myApp.messages(".messages", {
        autoLayout: !0
    }), myMessagebar = myApp.messagebar(".messagebar");
    // Handle message
    $$(".messagebar .link").on("click", function() {
        // Message text
        var messageText = myMessagebar.value().trim();
        // Exit if empy message
        if (0 !== messageText.length) {
            // Empty messagebar
            myMessagebar.clear();
            // Random message type
            var avatar, name, messageType = [ "sent", "received" ][Math.round(Math.random())];
            "received" === messageType && (avatar = "http://lorempixel.com/output/people-q-c-100-100-9.jpg", 
            name = "Kate"), // Add message
            myMessages.addMessage({
                // Message text
                text: messageText,
                // Random message type
                type: messageType,
                // Avatar and name:
                avatar: avatar,
                name: name,
                // Day
                day: conversationStarted ? !1 : "Today",
                time: conversationStarted ? !1 : new Date().getHours() + ":" + new Date().getMinutes()
            }), // Update conversation flag
            conversationStarted = !0;
        }
    });
	if ("blog" == page.name) {

	// new code	
		var allstudent = JSON.parse(sessionStorage.getItem("allstudent"));
		var tmpobj=""
		$.ajax({
			type: "POST",
			dataType: "html",
			url: "http://103.27.201.113/alumni/json/campaign2json.php", //Relative or absolute path to response.php file
			data: { offset : 0 },
			success: function(data) {
			//console.log(data)
			tmpobj = JSON.parse(data);
            console.log(data);
			var length = Object.keys(tmpobj.data).length;
			// console.log(length)
			html="";
			for (var i=0; i < length; i++) {
            var test = [];
            test = findvalue(allstudent.data,"id",readJSON(tmpobj.data[i].owner));
            console.log(test);
			tmpcampaign = new Campaign(decodeURI(tmpobj.data[i].id),decodeURI(tmpobj.data[i].name).replace(/\%3A/g,':').replace(/\+/g,' '),decodeURI(tmpobj.data[i].description).replace(/\%3A/g,':').replace(/\+/g,' '),decodeURI(tmpobj.data[i].images).replace(/\%3A/g,':').replace(/\+/g,' '),decodeURI(tmpobj.data[i].subimages).replace(/\%3A/g,':').replace(/\+/g,' '),decodeURI(tmpobj.data[i].subdescription).replace(/\%3A/g,':').replace(/\+/g,' '),decodeURI(tmpobj.data[i].status),decodeURI(tmpobj.data[i].owner),decodeURI(tmpobj.data[i].createon).replace(/\%3A/g,':').replace(/\+/g,' '),decodeURI(tmpobj.data[i].used));
            campaign.push(tmpcampaign);
            html+='<li><div class=item-content><div class=item-content no-padding><div class=item-inner blog-list><div class=image><a href=post1.html?id='+decodeURI(tmpobj.data[i].id)+'><img src=http://103.27.201.113/alumni/assets/uploads/'+decodeURI(tmpobj.data[i].images)+' width=300px><span class=rating blog-rating><span class=icon-star></span><span class=icon-star></span><span class=icon-star></span><span class=icon-star></span><span class=icon-star></span></span></a></div><div class=text><h4 class=title mt-5 mb-0><a href=post1.html?id='+decodeURI(tmpobj.data[i].id)+'>'+decodeURI(tmpobj.data[i].name)+'</a></h4><small>Owner: '+test[0].id+' at '+decodeURI(tmpobj.data[i].createon).replace(/\%3A/g,':').replace(/\+/g,' ')+'</small></div></div></div></div><div class=swipeout-actions-left><a href=# class=action-red js-add-to-fav><i class=fa fa-heart-o></i></a> </div></li>'
			}
			$("#fav").html(html);
            var tempvalue = JSON.stringify(campaign);
            sessionStorage.setItem("campaign", tempvalue);
            console.log(JSON.parse(sessionStorage.getItem("campaign")));
			}

		});	
	// end new code
		
	}
    // console.log(campaign)
    if ("post" == page.name) {
        var allstudent = JSON.parse(sessionStorage.getItem("allstudent"));
        //console.log(page.query);
        //console.log(JSON.parse(sessionStorage.getItem("campaign")));
        campaign = JSON.parse(sessionStorage.getItem("campaign"))
        var pageobject = findvalue(campaign,"id",page.query.id);
        // console.log(pageheader);
        $("#postheader").html(pageobject[0].name);
        $("#mainimg").attr("src", "http://103.27.201.113/alumni/assets/uploads/"+pageobject[0].images);
        $("#bigname").html(pageobject[0].name);
        $("#cowner").html("Author : "+ findvalue(allstudent.data,"id",pageobject[0].owner)[0].student_id + " at " + pageobject[0].createon);
        $("#maindesc").html(pageobject[0].description);
        $("#subimg").attr("src", "http://103.27.201.113/alumni/assets/uploads/"+pageobject[0].subimages);
        $("#subdesc").html(pageobject[0].subdescription);
        $("#name").val(pageobject[0].owner);
        
                    // console.log(studentinfo);
       
        var tmpobj=""
        $.ajax({
            type: "POST",
            dataType: "html",
            url: "http://103.27.201.113/alumni/json/comments2json.php", //Relative or absolute path to response.php file
            data: { "cid" : page.query.id },
            success: function(data) {
            //console.log(data)
            tmpobj = JSON.parse(data);
            var length = Object.keys(tmpobj.data).length;
            // console.log(length)
            html="";
            
            
            for (var i=0; i < length; i++) {
                (function(i){
                    var test = [];
                    test = findvalue(allstudent.data,"id",readJSON(tmpobj.data[i].owner));
                    console.log(test);
                    // console.log(i+"  "+countlike(tmpobj.data[i].id));
                    html+='<li class="swipeout"><div class="swipeout-content"><div class="swipeout-content"><div class="item-content"><div class="item-inner comments-list">';
                    html+='<div class="image"><span class="ava"><img src="http://103.27.201.113/alumni/assets/uploads/'+test[0].avatar+'" id="avaimg" alt=""></span></div>';
                    html+='<div class="text"><div class="info"><span class="nick">'+test[0].student_id+'</span><span class="data">'+readJSON(tmpobj.data[i].createon)+'</span>';
                    html+='</div><div class="comment">'+readJSON(tmpobj.data[i].comments)+'</div></div></div></div></div>';
                    html+='<div class="swipeout-actions-right"><a href="#" class="action-green js-up"><i class="fa fa-thumbs-o-up"></i>';
                    html+='</a><a href="#" class="action-red js-down"><i class="fa fa-thumbs-o-down"></i></a></div></li>';
                }(i));
            }
            $("#lcomments").html(html);
            }

        }); 
    }
    
    if ("profile" == page.name) {
        $('#geobutton').hide();
        $('#photobutton').hide();
        var middlename = "";
        var studentobj="";
        var initial = "";
        $.ajax({
            type: "POST",
            dataType: "html",
            url: "http://103.27.201.113/alumni/json/students2json.php", //Relative or absolute path to response.php file
            data: { "student_id" : studentid },
            success: function(data) {
            // console.log(data)
            studentobj = JSON.parse(data);
            
            studentinfo = studentobj.data[0];
            console.log(studentinfo);

            if (studentinfo.initname = "Mr.") {
                $('#radio_1').attr('checked', 'checked');
            } else if (studentinfo.initname = "Mrs.") {
                $('#radio_2').attr('checked', 'checked');
            } else if (studentinfo.initname = "Miss") {
                $('#radio_3').attr('checked', 'checked');
            }
            $('#radio_1').attr('disabled','disabled');
            $('#radio_2').attr('disabled','disabled');
            $('#radio_3').attr('disabled','disabled');
            $('#txtfirstname').val(readJSON(studentinfo.firstname));
            $('#txtfirstname').attr('disabled','disabled');
            $('#txtmidname').val(readJSON(studentinfo.middlename));
            $('#txtmidfname').attr('disabled','disabled');
            $('#txtlastname').val(readJSON(studentinfo.lastname));
            $('#txtlastname').attr('disabled','disabled');
            $('#txtemail').val(readJSON(studentinfo.email));
            $('#txtemail').attr('disabled','disabled');
            $('#txtgender').val(readJSON(studentinfo.gender));
            $('#txtgender').attr('disabled','disabled');
            //console.log(convertdate(readJSON(studentinfo.birthday)));
            $('#txtbirth').val(readJSON(studentinfo.birthday));    
            $('#txtbirth').attr('disabled','disabled');
            $('#txtage').val(readJSON(studentinfo.age));
            $('#txtage').attr('disabled','disabled');
            // console.log(length)
            $('#txtrace').val(readJSON(studentinfo.race));    
            $('#txtrace').attr('disabled','disabled');
            $('#txtnation').val(readJSON(studentinfo.nationality));    
            $('#txtnation').attr('disabled','disabled');
            $('#txtaddress').val(readJSON(studentinfo.address));    
            $('#txtaddress').attr('disabled','disabled');
            $('#txtaddress_1').val(readJSON(studentinfo.address_1));    
            $('#txtaddress_1').attr('disabled','disabled');
            $('#txtpostcode').val(readJSON(studentinfo.postcode));    
            $('#txtpostcode').attr('disabled','disabled');
            $('#txtcountry').val(readJSON(studentinfo.country));    
            $('#txtcountry').attr('disabled','disabled');
            $('#txthome_lat').val(readJSON(studentinfo.home_lat));    
            $('#txthome_lat').attr('disabled','disabled');
            $('#txthome_lng').val(readJSON(studentinfo.home_lng));    
            $('#txthome_lng').attr('disabled','disabled');
            $('#txtsid').val(readJSON(studentinfo.student_id));    
            $('#txtsid').attr('disabled','disabled');
            $('#txtclass').val(readJSON(studentinfo.student_class));    
            $('#txtclass').attr('disabled','disabled');

                $("#saveswitch").change(function() {
                    if(this.checked) {
                        $('#radio_1').removeAttr('disabled');
                        $('#radio_2').removeAttr('disabled');
                        $('#radio_3').removeAttr('disabled');
                        $('#txtfirstname').removeAttr('disabled');
                        $('#txtmidfname').removeAttr('disabled');
                        $('#txtlastname').removeAttr('disabled');
                        $('#txtemail').removeAttr('disabled');
                        $('#txtgender').removeAttr('disabled');
                        $('#txtbirth').removeAttr('disabled');
                        $('#txtage').removeAttr('disabled');
                        $('#txtrace').removeAttr('disabled');
                        $('#txtnation').removeAttr('disabled');
                        $('#txtaddress').removeAttr('disabled');
                        $('#txtaddress_1').removeAttr('disabled');
                        $('#txtpostcode').removeAttr('disabled');
                        $('#txtcountry').removeAttr('disabled');
                        $('#txthome_lat').removeAttr('disabled');
                        $('#txthome_lng').removeAttr('disabled');
                        $('#txtsid').removeAttr('disabled');
                        $('#txtclass').removeAttr('disabled');
                        $('#geobutton').show();
                        $('#photobutton').show();
                        //Do stuff
                    } else {
                        $('#radio_1').attr('disabled','disabled');
                        $('#radio_2').attr('disabled','disabled');
                        $('#radio_3').attr('disabled','disabled');
                        $('#txtfirstname').attr('disabled','disabled');
                        $('#txtmidfname').attr('disabled','disabled');
                        $('#txtlastname').attr('disabled','disabled');
                        $('#txtemail').attr('disabled','disabled');
                        $('#txtgender').attr('disabled','disabled');
                        $('#txtbirth').attr('disabled','disabled');
                        $('#txtage').attr('disabled','disabled');
                        $('#txtrace').attr('disabled','disabled');
                        $('#txtnation').attr('disabled','disabled');
                        $('#txtaddress').attr('disabled','disabled');
                        $('#txtaddress_1').attr('disabled','disabled');
                        $('#txtpostcode').attr('disabled','disabled');
                        $('#txtcountry').attr('disabled','disabled');
                        $('#txthome_lat').attr('disabled','disabled');
                        $('#txthome_lng').attr('disabled','disabled');
                        $('#txtsid').attr('disabled','disabled');
                        $('#txtclass').attr('disabled','disabled');

                        $('#geobutton').hide();
                        $('#geobutton').hide();
                    }
                });


        }
        }); 
        // console.log(studentinfo);
        google.maps.event.addDomListener(window, 'load', map = initialize(readJSON(studentinfo.home_lat),readJSON(studentinfo.home_lng)));
        var myLatLng = new google.maps.LatLng(readJSON(studentinfo.home_lat),readJSON(studentinfo.home_lng));
        map.setCenter(myLatLng);
        var marker = addMarker(myLatLng,map);

        
        $(document).on('click', '#geobutton', function(){
            (function(callback){
            navigator.geolocation.getCurrentPosition(onMapSuccess, geoshowError,{'enableHighAccuracy':true,'timeout':20000});
            console.log(studentinfo);

            callback();
            }(setHomeLatLng));

        });
        
        $(document).on('click', '#photobutton', function(){

                takePhoto();


        });

    }

    if ("settings" == page.name) {

        var privacyattr = JSON.parse(sessionStorage.getItem("privacyattr"));
        // console.log(privacyattr);

        (function(privacyattr){
            prysetting(privacyattr,"setting-email","email");
        }(privacyattr));
        (function(){
            prysetting(privacyattr,"setting-birthday","birthday");
        }(privacyattr));



    }
    
}), $(document).ready(function() {
        
        var middlename = "";
        var studentobj="";
        $.ajax({
            type: "POST",
            dataType: "html",
            url: "http://103.27.201.113/alumni/json/students2json.php", //Relative or absolute path to response.php file
            data: { "student_id" : studentid },
            success: function(data) {
            // console.log(data)
            studentobj = JSON.parse(data);
            
            studentinfo = studentobj.data[0];
            // console.log(studentinfo);
            var length = Object.keys(studentobj.data).length;
            // console.log(length)
                $("#avatardisplay").attr("src", "http://103.27.201.113/alumni/assets/uploads/"+readJSON(studentobj.data[0].avatar));
                var html = readJSON(studentobj.data[0].initname)+" "+readJSON(studentobj.data[0].firstname)+" ";
                if (readJSON(studentobj.data[0].middlename) == "" || readJSON(studentobj.data[0].middlename) == null) {
                    middlename = "";
                } else {
                    middlename = "("+readJSON(studentobj.data[0].middlename)+")";
                }
                html+=middlename+" "+readJSON(studentobj.data[0].lastname);

                $("#student_name").html(html);
            }

        }); 

        var studentobj1="";
        $.ajax({
            type: "POST",
            dataType: "html",
            url: "http://103.27.201.113/alumni/json/allstudents2json.php", //Relative or absolute path to response.php file
            data: { "student_id" : studentid },
            success: function(data) {
            // console.log(data)
            studentobj1 = JSON.parse(data);
            sessionStorage.setItem("allstudent", data);

            
            }

        }); 

        var pryobj=""
            $.ajax({
                type: "POST",
                dataType: "html",
                url: "http://103.27.201.113/alumni/json/privacy2json.php", //Relative or absolute path to response.php file
                data: { "student_id" : studentid },
                success: function(data) {
                //console.log(data)
                pryobj = JSON.parse(data);
                sessionStorage.setItem("privacyattr", data);
                
                }

            });

    setInterval(function(){ 
        // console.log("reload student");
        var middlename = "";
        var studentobj="";
        $.ajax({
            type: "POST",
            dataType: "html",
            url: "http://103.27.201.113/alumni/json/students2json.php", //Relative or absolute path to response.php file
            data: { "student_id" : studentid },
            success: function(data) {
            // console.log(data)
            studentobj = JSON.parse(data);
            
            studentinfo = studentobj.data[0];
            // console.log(studentinfo);
            var length = Object.keys(studentobj.data).length;
            // console.log(length)
                $("#avatardisplay").attr("src", "http://103.27.201.113/alumni/assets/uploads/"+readJSON(studentobj.data[0].avatar));
                var html = readJSON(studentobj.data[0].initname)+" "+readJSON(studentobj.data[0].firstname)+" ";
                if (readJSON(studentobj.data[0].middlename) == "" || readJSON(studentobj.data[0].middlename) == null) {
                    middlename = "";
                } else {
                    middlename = "("+readJSON(studentobj.data[0].middlename)+")";
                }
                html+=middlename+" "+readJSON(studentobj.data[0].lastname);

                $("#student_name").html(html);
            }

        }); 
    }, 10000);
        
    setInterval(function(){ 
        // console.log("reload all student");
        var studentobj1="";
        $.ajax({
            type: "POST",
            dataType: "html",
            url: "http://103.27.201.113/alumni/json/allstudents2json.php", //Relative or absolute path to response.php file
            data: { "student_id" : studentid },
            success: function(data) {
            // console.log(data)
            studentobj1 = JSON.parse(data);
            sessionStorage.setItem("allstudent", data);

            
            }

        }); 
    }, 300000);

    setInterval(function(){ 
        // console.log("reload privacy");
        var pryobj=""
            $.ajax({
                type: "POST",
                dataType: "html",
                url: "http://103.27.201.113/alumni/json/privacy2json.php", //Relative or absolute path to response.php file
                data: { "student_id" : studentid },
                success: function(data) {
                //console.log(data)
                pryobj = JSON.parse(data);
                sessionStorage.setItem("privacyattr", data);
                
                }

            });
    }, 10000);

    if ((null === localStorage.getItem("newOptions") || localStorage.getItem("newOptions") === !0) && (myApp.popup(".popup-splash"), 
    localStorage.setItem("newOptions", !0)), $(".chart-content").length > 0) {
        var obj = document.querySelector(".chart-content"), ctx = obj.getContext("2d");
        showLineChart(ctx);
    }
    if ($(".line-chart-content").length > 0) {
        var obj = document.querySelector(".line-chart-content"), ctx = obj.getContext("2d");
        showLineChartPage(ctx);
    }
    if ($(".bar-chart-content").length > 0) {
        var obj = document.querySelector(".bar-chart-content"), ctx = obj.getContext("2d");
        showBarChartPage(ctx);
    }
    if ($(".pie-chart-content").length > 0) {
        var obj = document.querySelector(".pie-chart-content"), ctx = obj.getContext("2d");
        showPieChartPage(ctx);
    }
    if ($(".doughnut-chart-content").length > 0) {
        var obj = document.querySelector(".doughnut-chart-content"), ctx = obj.getContext("2d");
        showDoughnutChartPage(ctx);
    }
    if ($(".radar-chart-content").length > 0) {
        var obj = document.querySelector(".radar-chart-content"), ctx = obj.getContext("2d");
        showRadarChartPage(ctx);
    }
    if ($(".polar-chart-content").length > 0) {
        var obj = document.querySelector(".polar-chart-content"), ctx = obj.getContext("2d");
        showPolarChartPage(ctx);
    }
    naxvarBg(), $(".js-toggle-menu").on("click", function() {
        $(this).next().slideToggle(200), $(this).find("span").toggleClass("icon-chevron-down").toggleClass("icon-chevron-up");
    });
}), $.fn.serializeObject = function() {
    var o = {}, a = this.serializeArray();
    return $.each(a, function() {
        void 0 !== o[this.name] ? (o[this.name].push || (o[this.name] = [ o[this.name] ]), 
        o[this.name].push(this.value || "")) : o[this.name] = this.value || "";
    }), o;
};

var defColor = "178, 137, 115", fillColor = "rgba(" + defColor + ", 0.2)", strokeColor = "rgba(" + defColor + ", 1)", pointColor = "rgba(" + defColor + ", 1)", pointStrokeColor = "rgba(255, 255, 255, 1)", pointHighlightFill = "rgba(255, 255, 255, 1)", pointHighlightStroke = "rgba(" + defColor + ", 1)", pointColorHighlight = "rgba(" + defColor + ", 0.5)", defColor2 = "224, 61, 14", fillColor2 = "rgba(" + defColor2 + ", 0.2)", strokeColor2 = "rgba(" + defColor2 + ", 1)", pointColor2 = "rgba(" + defColor2 + ", 1)", pointStrokeColor2 = "rgba(255, 255, 255, 1)", pointHighlightFill2 = "rgba(255, 255, 255, 1)", pointHighlightStroke2 = "rgba(" + defColor2 + ", 1)", pointColorHighlight2 = "rgba(" + defColor2 + ", 0.5)";