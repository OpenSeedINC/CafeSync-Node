//var fs = require('fs');

//var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);

//openSeed specifics


//var configUrl = "~/.config/OpenSeed/" + appId
//var dbUrl = "~/.local/Shared/OpenSeed/" + appId


// done with those

// CafeSync Specifics//console.log(configUrl)


var component;

function save_card(id,username,useremail,userphone,usercompany,useralias,usermotto,website1,website2,website3,sendcard,usealias,contact,w1,w2,w3,avatar,cardback,cardcat) {

    var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);
    var userStr = "INSERT INTO Card VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var data = [id,username,useremail,userphone,usercompany,useralias,usermotto,website1,website2,website3,avatar,cardback];

        db.transaction(function(tx) {
           tx.executeSql("DROP TABLE Card");
            tx.executeSql('CREATE TABLE IF NOT EXISTS Card(id TEXT, name TEXT, email TEXT, phone TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT,cardback TEXT)');
            tx.executeSql(userStr, data);

        });
     var settingStr = "INSERT INTO Options VALUES(?,?,?,?,?,?,?)";
    var settingdata = [id,sendcard,usealias,contact,w1,w2,w3];

    db.transaction(function(tx) {
       tx.executeSql("DROP TABLE Options");
        tx.executeSql('CREATE TABLE IF NOT EXISTS Options(id TEXT, sendcard TEXT, alias TEXT, contact TEXT,w1 TEXT,w2 TEXT,w3 TEXT)');
        tx.executeSql(settingStr, settingdata);

    });
        //getScript("openseed.js",upload_data());
        //console.log(data);
return 1;
}

function load_Card() {

    ///console.log(test[1]);

     var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);
     var dataStr = "SELECT * FROM Card WHERE 1";

    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Card(id TEXT, name TEXT, email TEXT, phone TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT,cardback TEXT)');
        var pull =  tx.executeSql(dataStr);
        if(pull.rows.length > 0) {
            userid = pull.rows.item(0).id;
           // username = pull.rows.item(0).name;
          //  useremail = pull.rows.item(0).email;
           // userphone = pull.rows.item(0).phone;
            usercompany = pull.rows.item(0).company;
          //  useralias = pull.rows.item(0).alias;
           // usermotto = pull.rows.item(0).motto;
          //  website1 = pull.rows.item(0).website1;
          //  website2 = pull.rows.item(0).website2;
          //  website3 = pull.rows.item(0).website3;
         //   avimg = pull.rows.item(0).avatar;
           // cardbImg = pull.rows.item(0).cardback;


            return 1;

        } else {
            //console.log("No User found");
            return 0;
            }


    });

    var cardStr = "SELECT * FROM Options WHERE 1";
    var test = "";
    db.transaction(function(tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS Options(id TEXT, sendcard INT, alias INT, contact INT,w1 INT,w2 INT,w3 INT)');
        var pull = tx.executeSql(cardStr);
        if(pull.rows.length > 0) {
            //id=pull.rows.item(0).id;
            //stf = torf(pull.rows.item(0).sendcard);
            //atf = torf(pull.rows.item(0).alias);
            //ctf = torf(pull.rows.item(0).contact);
           // wtf = torf(pull.rows.item(0).w1);
            //w1tf = torf(pull.rows.item(0).w2);
            //w2tf = torf(pull.rows.item(0).w3);

            cardloaded = 1;

            test = torf(pull.rows.item(0).sendcard);

        } else { PopupUtils.open(firstrun);
            cardloaded = 0; }
    });



    //console.log(sendCard.checked,test);

}


function Temp_load() {
     var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);

        var dataStr = "SELECT * FROM TempCards WHERE 1";

   //console.log("listing '"+search+"'")


        db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS TempCards(id INT UNIQUE, name TEXT, phone TEXT, email TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT, cardback TEXT,stamp INT)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS SavedCards(id INT UNIQUE, name TEXT, email TEXT, phone TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT, cardback TEXT)');

        var pull =  tx.executeSql(dataStr);
        numofcards = pull.rows.length;

        var record = 0;
    while (pull.rows.length > record) {
            var testStr = "SELECT  *  FROM SavedCards WHERE id= "+pull.rows.item(record).id;
            var duplicate = tx.executeSql(testStr);

           if(duplicate.rows.length == 0) {

                var w1;
                 var w2;
                 var w3;
                 var card;
                var ava;

               //if(cardsynctemp.match(pull.rows.item(record).id) < 1) {
              // cardsynctemp = pull.rows.item(record).id +","+cardsynctemp;
               // }

               switch(pull.rows.item(record).website1.substring(0,4)) {
               case "http":w1 = pull.rows.item(record).website1;break;
               case "HTTP":w1 = pull.rows.item(record).website1;break;
               case "Http":w1 = pull.rows.item(record).website1;break;
               default: w1 = "http://"+pull.rows.item(record).website1;break;
               }

                  //if(pull.rows.item(record).website1.substring(0,4) != "http") {w1 = "http://"+pull.rows.item(record).website1;}
                  //    else { w1 = pull.rows.item(record).website1; }
                  if(pull.rows.item(record).website2.substring(0,4) != "http") {w2 = "http://"+pull.rows.item(record).website2;}
                      else { w2 = pull.rows.item(record).website2; }
                  if(pull.rows.item(record).website3.substring(0,4) != "http") {w3 = "http://"+pull.rows.item(record).website3;}
                      else { w3 = pull.rows.item(record).website3; }

                   if(pull.rows.item(record).cardback.length < 4) { card = "img/default_card.png"} else {card = pull.rows.item(record).cardback}
                   if(pull.rows.item(record).avatar.length < 4) { ava = "img/default_avatar.png"} else {ava = pull.rows.item(record).avatar}


                   var cardname = pull.rows.item(record).name;
                   var colorCode = "white";
                   var imagesource = ava;
                   var cardback = card;
                   var company = pull.rows.item(record).company;
                   var phone =  pull.rows.item(record).phone;
                   var email =  pull.rows.item(record).email;
                   var motto = pull.rows.item(record).motto;
                   var cardnum = pull.rows.item(record).id;

                   var URL1 = w1;
                   var URL2 = w2;
                   var URL3 = w3;

                   //var cardback = card;

                   var imgsource = ava;
                   var cardx = Math.floor(((Math.random() * (backboard.width * 0.7))));
                   var cardy = Math.floor(((Math.random() * (backboard.height* 0.7))));
                   while(cardx + 200 > backboard.width) {
                       //console.log("too much to the right");
                   cardx = Math.floor(((Math.random() * (backboard.width * 0.7))));

                   }
                   while(cardy + 200 > backboard.height) {
                       //console.log("too far down");
                   cardy = Math.floor(((Math.random() * (backboard.height* 0.7))));
                   }

                   lastx = cardx * 0.7;
                   lasty = cardy* 0.5;

                   console.log(cardsynctemp.search(cardnum));
                    if(cardsynctemp.search(cardnum) == -1) {


                    createCard(cardx,cardy,backboard.width,backboard.height,cardname,colorCode,imagesource,cardback,company,phone,email,motto,cardnum,URL1,URL2,URL3,record);
                        cardsynctemp = pull.rows.item(record).id +","+cardsynctemp;
                    } else {
                        console.log(cardsynctemp.search(cardnum));
                        console.log("already createded");
                    }

         //cavimg = ava;
         //cardback = card;
        }
        record = record + 1;
    }

    });

}

function Cards_save(id,username,useremail,userphone,usercompany,useralias,usermotto,website1,website2,website3,avatar,cardback) {
   var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);
    var userStr = "INSERT INTO SavedCards VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    var data = [id,username,useremail,userphone,usercompany,useralias,usermotto,website1,website2,website3,avatar,cardback];

        db.transaction(function(tx) {
           //tx.executeSql("DROP TABLE Card");
            tx.executeSql('CREATE TABLE IF NOT EXISTS SavedCards(id INT UNIQUE, name TEXT, email TEXT, phone TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT,cardback TEXT)');
            tx.executeSql(userStr, data);

        });
    cardsyncsaved = id+","+cardsyncsaved

   // console.log("FUNCTION!!! SAVE CARDS!!!")

return 1;
}

function Cards_load(search) {
    var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);


    if (search.length > 0) {
     var dataStr = "SELECT * FROM SavedCards WHERE name LIKE '%"+search+"%'";
    } else {
        var dataStr = "SELECT * FROM SavedCards WHERE 1";
        cardsyncsaved = "";

}

       db.transaction(function(tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS SavedCards(id INT UNIQUE, name TEXT, email TEXT, phone TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT, cardback TEXT)');
       var pull =  tx.executeSql(dataStr);

           //numofcards = pull.rows.length;
           var record = 0;
       while (pull.rows.length > record) {

           cardsyncsaved = pull.rows.item(record).id +","+cardsyncsaved;

          var w1;
           var w2;
           var w3;
           var card;
           var ava;
                switch(pull.rows.item(record).website1.substring(0,4)) {
                case "http":w1 = pull.rows.item(record).website1;break;
                case "HTTP":w1 = pull.rows.item(record).website1;break;
                case "Http":w1 = pull.rows.item(record).website1;break;
                default: w1 = "http://"+pull.rows.item(record).website1;break;
                }

            //if(pull.rows.item(record).website1.substring(0,4) != "http") {w1 = "http://"+pull.rows.item(record).website1;}
             //   else { w1 = pull.rows.item(record).website1; }
            if(pull.rows.item(record).website2.substring(0,4) != "http") {w2 = "http://"+pull.rows.item(record).website2;}
                else { w2 = pull.rows.item(record).website2; }
            if(pull.rows.item(record).website3.substring(0,4) != "http") {w3 = "http://"+pull.rows.item(record).website3;}
                else { w3 = pull.rows.item(record).website3; }

             if(pull.rows.item(record).cardback.length < 4 ) { card = "img/default_card.png"} else {card = pull.rows.item(record).cardback}
             if(pull.rows.item(record).avatar.length < 4) { ava = "img/default_avatar.png"} else {ava = pull.rows.item(record).avatar}

               cardslist.append({ name: pull.rows.item(record).name,
               colorCode: "white",
               imagesource: "img/default_avatar.png",
               company: pull.rows.item(record).company,
               phone:  pull.rows.item(record).phone,
               email:  pull.rows.item(record).email,
               card: pull.rows.item(record).id,
               motto:pull.rows.item(record).motto,
               URL1: w1,
               URL2: w2,
               URL3: w3,

               cardback:card,
               imgsource:ava,
               saved:1
           });
             //cavimg = ava;
             //cardback = card;

           record = record + 1;
       }


       });
console.log("From Load_cards "+cardsyncsaved);

return 1;
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

function Show_sites(cid) {

    var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);
    var dataStr = "SELECT * FROM TempCards WHERE id ='"+cid+"'";

        //console.log("showing sites for " + cid);
        webview1 = "";
        //webview2 = "";
        //webview3 = "";

       db.transaction(function(tx) {

       tx.executeSql('CREATE TABLE IF NOT EXISTS TempCards(id INT UNIQUE, name TEXT, phone TEXT, email TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT, cardback TEXT, stamp INT)');
       var pull =  tx.executeSql(dataStr);

           //card: pull.rows.item(record).id,
            pages = 0;
           if(pull.rows.item(0).website1.length > 0) {
               pages = pages + 1;

               webview1 = pull.rows.item(0).website1;

                if(webview1.search("http") == -1) {
                    webview1 = "http://" + webview1;
                }

               //console.log(webview1);
           }
           /*if(pull.rows.item(0).website2.length > 0) {
               pages = pages + 1;
               webview2 = pull.rows.item(0).website2;
               if(webview2.search("http") == -1) {
                   webview2 = "http://" + webview2;
               }
               //console.log(webview1);
           }
           if(pull.rows.item(0).website3.length > 0) {
               pages = pages + 1;
               webview3 = pull.rows.item(0).website3;
               if(webview3.search("http") == -1) {
                   webview3 = "http://" + webview3;
               }
               //console.log(webview1);
           } */



   });


}

function Delete_card(cid) {

    var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);

     db.transaction(function(tx) {
         var notme = cardsynctemp;
         cardsynctemp = "";
    var tempDel = "DELETE FROM TempCards WHERE id ='"+cid+"'";
         tx.executeSql(tempDel);
        console.log("deleted"+cid);
         var check = 0;
         while(check < numofcards) {
            if(notme.split(",")[check] == cid) {
                console.log("found the guy");
            } else {
            cardsynctemp = notme.split(",")[check] + "," + cardsynctemp;
            }


             check = check + 1;
         }

            numofcards = numofcards - 1;
     });
    db.transaction(function(tx) {
    var saveDel = "DELETE FROM SavedCards WHERE id ='"+cid+"'";
        tx.executeSql(saveDel);
        console.log("removed"+cid);
    });
}

function createCard(x,y,parentwidth,parentheight,cardname,colorCode,imagesource,cardback,company,phone,email,motto,cardnum,URL1,URL2,URL3,num) {
   // console.log("creatingCard");

    if(component == null) {
        component = Qt.createComponent("Card.qml");
    }

    if (component.status == Component.Ready) {
        var dynamicObject = component.createObject(backboard);

        if(dynamicObject == null) {
            console.log("error creating block");
            console.log(component.errorString());
            return false;
        }
        dynamicObject.x = x;
        dynamicObject.y = y;
        dynamicObject.width = parentwidth / 6;
        dynamicObject.height = parentwidth / 10;
            var bimg = "img/default_card.png"
            if(cardback.search("internal") == -1) {
                if(cardback.length > 2) {bimg = cardback;
                                            console.log("cardimg: "+bimg);
                }
                else {
                    bimg = bimg;
                            console.log("blank: "+bimg);
                            }
                    }
                    else {console.log("interal: "+cardback);}

        dynamicObject.name = cardname;
        dynamicObject.colorCode = colorCode;
        dynamicObject.imagesource =imagesource;
        dynamicObject.cardback = bimg;
        dynamicObject.company = company;
        dynamicObject.phone = phone;
        dynamicObject.email = email;
        dynamicObject.motto = motto;
        dynamicObject.card = cardnum;
        dynamicObject.url1 = URL1;
        dynamicObject.url2 = URL2;
        dynamicObject.url3 = URL3;


    } else {
        console.log("error loading card component");
        console.log(component.errorString());
        return false;
    }
    return true;

}

function cardinfo(cid) {
    var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);

       var dataStr = "SELECT * FROM TempCards WHERE id = '"+cid+"'";

    db.transaction(function(tx) {

    tx.executeSql('CREATE TABLE IF NOT EXISTS TempCards(id INT UNIQUE, name TEXT, phone TEXT, email TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT, cardback TEXT,stamp INT)');
    var pull =  tx.executeSql(dataStr);
        avatar = pull.rows.item(0).avatar;
        company = pull.rows.item(0).company;
        name = pull.rows.item(0).name;
        phone = pull.rows.item(0).phone;
        email = pull.rows.item(0).email;
        motto = pull.rows.item(0).motto;
        cardback = pull.rows.item(0).cardback;

    });

}

function removeOld(cid) {

    var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);
    var twodays = 172800;
    //000;

    var dataStr = "SELECT * FROM TempCards WHERE id="+cid
    var comeback = 0;
    //console.log(Date.now);
    db.transaction(function(tx) {

        tx.executeSql('CREATE TABLE IF NOT EXISTS TempCards(id INT UNIQUE, name TEXT, phone TEXT, email TEXT,company TEXT,alias TEXT, motto TEXT, website1 TEXT,website2 TEXT,website3 TEXT,avatar TEXT, cardback TEXT,stamp INT)');
        var pull =  tx.executeSql(dataStr);
        var record = 0;
        var deletedate = 0;

        while (pull.rows.length > record) {
                deletedate =(pull.rows.item(record).stamp + twodays);

            if((pull.rows.item(record).stamp + twodays) < Date.now()) {

                comeback = pull.rows.item(record).id;

                        //Delete_card(pull.rows.item(record).id);
                        //console.log("removing"+ pull.rows.item(record).id)



            } else {
                //console.log((((pull.rows.item(record).stamp + twodays)-Date.now()) / 60) /60);
            }

            record = record + 1;
        }
    });
    return comeback;
}
