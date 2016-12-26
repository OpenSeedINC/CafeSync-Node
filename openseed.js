

function oseed_auth(name,email) {

    var http = new XMLHttpRequest();
    var url = "http://openseed.vagueentertainment.com/corescripts/auth.php?devid=" + devId + "&appid=" + appId + "&username="+ name + "&email=" + email ;
    //console.log(url)
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            //console.log(http.responseText);
            //userid = http.responseText;
            if(http.responseText == 100) {
                console.log("Incorrect DevID");
            } else if(http.responseText == 101) {
                console.log("Incorrect AppID");
            } else {
              //  console.log(http.responseText);
                userid = http.responseText;
                datasync(http.responseText);
                return http.responseText;
            }

        }
    }
    http.open('GET', url, true);
    http.send(null);
}

function datasync (id) {
      console.log("datasync:" + id);
    var http = new XMLHttpRequest();
    var url = "http://openseed.vagueentertainment.com/devs/" + devId + "/" + appId + "/scripts/sync.php?id=" + id;
    var carddata = "";

    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            //carddata = http.responseText;
                console.log(carddata);
            if(http.responseText == 100) {

                console.log("Incorrect DevID");

            } else if(http.responseText == 101) {
                console.log("Incorrect AppID");
            } else {

            carddata = http.responseText;

    var cid = carddata.substring(carddata.search("<id>")+4,carddata.search("</id>"));
    var name = carddata.substring(carddata.search("<name>")+6,carddata.search("</name>"));
    var phone = carddata.substring(carddata.search("<phone>")+7,carddata.search("</phone>"));

    var email = carddata.substring(carddata.search("<email>")+7,carddata.search("</email>"));
    var company = carddata.substring(carddata.search("<company>")+9,carddata.search("</company>"));
    var alias = carddata.substring(carddata.search("<alias>")+7,carddata.search("</alias>"));
    var motto = carddata.substring(carddata.search("<motto>")+7,carddata.search("</motto>"));

    var send = carddata.substring(carddata.search("<send>")+6,carddata.search("</send>"));
    var usealias = carddata.substring(carddata.search("<usealias>")+10,carddata.search("</usealias>"));
    var contact = carddata.substring(carddata.search("<contact>")+9,carddata.search("</contact>"));

    var link1 = carddata.substring(carddata.search("<link1>")+7,carddata.search("</link1>"));
    var link2 = carddata.substring(carddata.search("<link2>")+7,carddata.search("</link2>"));
    var link3 = carddata.substring(carddata.search("<link3>")+7,carddata.search("</link3>"));


    var elink1 = carddata.substring(carddata.search("<elink1>")+8,carddata.search("</elink1>"));
    var elink2 = carddata.substring(carddata.search("<elink2>")+8,carddata.search("</elink2>"));
    var elink3 = carddata.substring(carddata.search("<elink3>")+8,carddata.search("</elink3>"));

    var avatar = carddata.substring(carddata.search("<avatar>")+8,carddata.search("</avatar>"));
    var cardbk = carddata.substring(carddata.search("<cardbk>")+8,carddata.search("</cardbk>"));
    var cardcat = carddata.substring(carddata.search("<cardcat>")+9,carddata.search("</cardcat>"));
    var cardsav = carddata.substring(carddata.search("<cardsav>")+9,carddata.search("</cardsav>"));
    var cardtem = carddata.substring(carddata.search("<cardtem>")+9,carddata.search("</cardtem>"));
    var cardsop = carddata.substring(carddata.search("<cardsop>")+9,carddata.search("</cardsop>"));



if (cid.length > 4) {

    var data = [cid,name,phone,email,company,alias,motto,link1,link2,link3,avatar,cardbk];

    var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);

    var dataStr = "INSERT INTO Card VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";

    db.transaction(function(tx) {

       tx.executeSql('CREATE TABLE IF NOT EXISTS Card (id TEXT, name TEXT, phone TEXT, email TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT, cardback TEXT)');
       tx.executeSql(dataStr, data);


       });

      var settingStr = "INSERT INTO Options VALUES(?,?,?,?,?,?,?)";
      var settingdata = [cid,send,usealias,contact,elink1,elink2,elink3];

               db.transaction(function(tx) {
                  tx.executeSql("DROP TABLE Options");
                   tx.executeSql('CREATE TABLE IF NOT EXISTS Options(id TEXT, sendcard TEXT, alias TEXT, contact TEXT,w1 TEXT,w2 TEXT,w3 TEXT)');
                   tx.executeSql(settingStr, settingdata);

               });


        username = name;
        userphone = phone;
        useremail = email;
        usercompany = company;
        useralias = alias;
        usermotto = motto;
        website1 = link1;
        website2 = link2;
        website3 = link3;
        avimg = avatar;
        cardbImg = cardbk;

        stf= torf(send);
        atf= torf(usealias);
        ctf= torf(contact);
        wtf= torf(elink1);
        w1tf= torf(elink2);
        w2tf= torf(elink3);

             }

if (cardsop == 2) {

         } else {


}
 }
        }
    }
        http.open('GET', url, true);
        http.send(null);

}


function upload_data(Id,name,phone,email,company,ali,motto,send,ua,sc,l1,l2,l3,le1,le2,le3,av,cardback,cardcat,cardsav,cardtem,cardsop) {
    var http = new XMLHttpRequest();
    var url = "http://openseed.vagueentertainment.com/devs/" + devId + "/" + appId + "/scripts/addcard.php?id=" + Id + "&name=" + name + "&phone="+ phone + "&email=" + email +
                "&company=" + company + "&alias=" + ali + "&motto=" + motto + "&send=" + send + "&ua=" + ua + "&sc=" + sc + "&l1=" + l1 + "&l2=" + l2 + "&l3=" + l3
                + "&le1=" + le1 + "&le2=" + le2 + "&le3=" + le3 + "&avatar=" + av + "&cardback=" + cardback + "&cardcat=" + cardcat +"&cardsav=" + cardsav + "&cardtem="+cardtem+"&cardsop="+ cardsop;
    //console.log(url)
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            //console.log(http.responseText);

            if(http.responseText == 100) {

                console.log("Incorrect DevID");

            } else if(http.responseText == 101) {
                console.log("Incorrect AppID");
            } else {
                //console.log(http.responseText);
               // userid = http.responseText;

            }

        }
    }
    http.open('GET', url, true);
    http.send(null);


}

function retrieve_data(id) {

    console.log("collecting new info")

    var http = new XMLHttpRequest();
    var url = "http://openseed.vagueentertainment.com/devs/" + devId + "/" + appId + "/scripts/updateloc.php?id=" + id;
    //console.log(url);

    var carddata = "";
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            carddata = http.responseText;


            if(http.responseText == 100) {

                console.log("Incorrect DevID");

            } else if(http.responseText == 101) {
                console.log("Incorrect AppID");
            } else {
                //console.log(http.responseText);
              //carddata = http.responseText;
                //console.log(carddata);

                   var numcards = carddata.substring(carddata.search("<cards>")+7,carddata.search("</cards>"));


                    console.log("results",numofcards);

                    var cardpos = carddata.split("<card>");



                    for (var i=1;i<=numcards;i++) {

                        var cid = cardpos[i].substring(cardpos[i].search("<cardnum>")+9,cardpos[i].search("</cardnum>"));
                        var name = cardpos[i].substring(cardpos[i].search("<name>")+6,cardpos[i].search("</name>"));
                        var phone = cardpos[i].substring(cardpos[i].search("<phone>")+7,cardpos[i].search("</phone>"));

                        var email = cardpos[i].substring(cardpos[i].search("<email>")+7,cardpos[i].search("</email>"));
                        var company = cardpos[i].substring(cardpos[i].search("<company>")+9,cardpos[i].search("</company>"));
                        var calias = cardpos[i].substring(cardpos[i].search("<alias>")+7,cardpos[i].search("</alias>"));
                        var motto = cardpos[i].substring(cardpos[i].search("<motto>")+7,cardpos[i].search("</motto>"));

                        var send = cardpos[i].substring(cardpos[i].search("<send>")+6,cardpos[i].search("</send>"));
                        var usealias = cardpos[i].substring(cardpos[i].search("<usealias>")+10,cardpos[i].search("</usealias>"));
                        var contact = cardpos[i].substring(cardpos[i].search("<contact>")+9,cardpos[i].search("</contact>"));

                        var link1 = cardpos[i].substring(cardpos[i].search("<link1>")+7,cardpos[i].search("</link1>"));
                        var link2 = cardpos[i].substring(cardpos[i].search("<link2>")+7,cardpos[i].search("</link2>"));
                        var link3 = cardpos[i].substring(cardpos[i].search("<link3>")+7,cardpos[i].search("</link3>"));


                       // var elink1 = cardpos[i].substring(cardpos[i].search("<elink1>")+8,cardpos[i].search("</elink1>"));
                      //  var elink2 = cardpos[i].substring(cardpos[i].search("<elink2>")+8,cardpos[i].search("</elink2>"));
                      //  var elink3 = cardpos[i].substring(cardpos[i].search("<elink3>")+8,cardpos[i].search("</elink3>"));
                        var avatar = cardpos[i].substring(cardpos[i].search("<avatar>")+8,cardpos[i].search("</avatar>"));
                        var cardbk = cardpos[i].substring(cardpos[i].search("<cardbk>")+8,cardpos[i].search("</cardbk>"));
                        var cardcat = cardpos[i].substring(cardpos[i].search("<cardcat>")+9,cardpos[i].search("</cardcat>"));





                        var data = [cid,name,phone,email,company,calias,motto,link1,link2,link3,avatar,cardbk,Date.now()];

                        var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);

                        var dataStr = "INSERT INTO TempCards VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";

                        var testStr = "SELECT  *  FROM TempCards WHERE id= "+cid;


                        db.transaction(function(tx) {

                            tx.executeSql('CREATE TABLE IF NOT EXISTS TempCards(id INT UNIQUE, name TEXT, phone TEXT, email TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT, cardback TEXT, stamp INT)');

                            var duplicate = tx.executeSql(testStr);

                            if(duplicate.rows.length == 0) {


                           tx.executeSql(dataStr, data);

                            } else {
                                console.log("duplicate card");
                            }

                           });

                    }




            }

        }
    }
    http.open('GET', url, true);
    http.send(null);


//return 0;
}

function torf (num) {
    if (num == 0) {
        //console.log(num);
        return ("false");
    } else {
        //console.log(num);
        return ("true");
    }
}





    function sync_cards(id,opt) {
        var http = new XMLHttpRequest();
        var url;
         var carddata = "";
        var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);


        //console.log("remotesaved = "+remotesaved.length+" and contains"+remotesaved);
        var dataStr = "SELECT * FROM SavedCards WHERE 1";
        db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS SavedCards(id INT UNIQUE, name TEXT, email TEXT, phone TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT, cardback TEXT)');
        var pull =  tx.executeSql(dataStr);
                var record = 0;
            while (pull.rows.length > record) {

                cardsyncsaved = pull.rows.item(record).id +","+cardsyncsaved;
                record = record + 1;
            }

        });

        if (remotesaved.length < cardsyncsaved.length) {
                console.log("Syncing Remote Cards");
            if(opt == 2) {

                url = "http://openseed.vagueentertainment.com/devs/" + devId + "/" + appId + "/scripts/updatecards.php?id=" + id+"&cardsav="+cardsyncsaved+"&cardtem"+cardsynctemp;
            } else {
                url = "http://openseed.vagueentertainment.com/devs/" + devId + "/" + appId + "/scripts/updatecards.php?id=" + id+"&cardsav="+cardsyncsaved;
            }
                //console.log("Uploading list:"+cardsyncsaved);

                   // console.log(url);

            carddata = "";
            http.onreadystatechange = function() {
                if (http.readyState == 4) {
                    carddata = http.responseText;


                    if(http.responseText == 100) {

                        console.log("Incorrect DevID");

                    } else if(http.responseText == 101) {
                        console.log("Incorrect AppID");
                    } else {


                    }
                }
            }
                    http.open('GET', url, true);
                    http.send(null);
        }

        if (cardsyncsaved.length < remotesaved.length ) {
            console.log("Syncing local cards");

            var cardlist = remotesaved.split(",");
            var num = 0;

            while(cardlist[num].length > 0) {
                update_card(cardlist[num],"saved");
                num = num + 1;
            }
        }




        if (opt == 3) {

                url = "http://openseed.vagueentertainment.com/devs/" + devId + "/" + appId + "/scripts/updatecards.php?id=" + id+"&cardsav="+cardsyncsaved;

                //console.log("Uploading list:"+cardsyncsaved);

                    console.log(url);

            carddata = "";
            http.onreadystatechange = function() {
                if (http.readyState == 4) {
                    carddata = http.responseText;


                    if(http.responseText == 100) {

                        console.log("Incorrect DevID");

                    } else if(http.responseText == 101) {
                        console.log("Incorrect AppID");
                    } else {


                    }
                }
            }
                    http.open('GET', url, true);
                    http.send(null);
        }





}

function get_list(id,list) {

    var http = new XMLHttpRequest();
    var url;
     var carddata = "";


    switch(list) {
    case "saved":
        url = "http://openseed.vagueentertainment.com/devs/" + devId + "/" + appId + "/scripts/getlists.php?id=" + id+"&list=saved";
        carddata = "";
        //console.log(url);
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                carddata = http.responseText;


                if(http.responseText == 100) {

                    console.log("Incorrect DevID");

                } else if(http.responseText == 101) {
                    console.log("Incorrect AppID");
                } else {
                        carddata = http.responseText;
                        remotesaved = carddata;
                        sync_cards(userid,0);
                        //console.log("from interwebs "+carddata);

                }
            }
        }
                http.open('GET', url, true);
                http.send(null);
       break;



    case "temp":break;

    }


}

function update_card(id,list) {
    console.log("getting card "+id);

    var http = new XMLHttpRequest();
    var url = "http://openseed.vagueentertainment.com/devs/" + devId + "/" + appId + "/scripts/updatecard.php?id=" + userid+"&cid="+id;
    //console.log(url);

    var carddata = "";
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            carddata = http.responseText;


            if(http.responseText == 100) {

                console.log("Incorrect DevID");

            } else if(http.responseText == 101) {
                console.log("Incorrect AppID");
            } else {


                    var cardpos = carddata.split(";&;");

                var cid = cardpos[0];
                var name = cardpos[1];
                var phone = cardpos[3];

                var email = cardpos[2];
                var company = cardpos[4];
                var calias = cardpos[5];
                var motto = cardpos[6];

                var link1 = cardpos[7];
                var link2 = cardpos[8];
                var link3 = cardpos[9];

                var avatar = cardpos[10];
                var cardbk = cardpos[11];
                //var cardcat = cardpos[15];



                var data = [cid,name,phone,email,company,calias,motto,link1,link2,link3,avatar,cardbk];

                var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);

                var dataStr = "INSERT INTO SavedCards VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";

                var testStr = "SELECT  *  FROM SavedCards WHERE id= "+cid;


                db.transaction(function(tx) {

                    //var duplicate = tx.executeSql(testStr);

                    //if(duplicate.rows.length == 0) {

                   tx.executeSql('CREATE TABLE IF NOT EXISTS SavedCards(id INT UNIQUE, name TEXT, phone TEXT, email TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT, cardback TEXT)');
                   tx.executeSql(dataStr, data);

                    //}

                   });

            }

        }
    }
    http.open('GET', url, true);
    http.send(null);



}
