import QtQuick 2.3
import QtQuick.Window 2.2
//import QtQuick.Controls 1.3
//import QtQuick.Controls.Styles 1.3
import Ubuntu.Components 1.2
import QtGraphicalEffects 1.0
import QtQuick.LocalStorage 2.0 as Sql

import "main.js" as Scripts

Item {
    id:cardItem
    property bool flipped: false


    property string name: ""
    property string colorCode: "white"
    property string imagesource: "img/default_avatar.png"
    property string cardback:"img/default_card.png"
    property string company:""
    property string phone:""
    property string email:""
    property string motto:""
    property string card: ""

    property string url1: ""
    property string url2: ""
    property string url3: ""

    //property string cardback:""

    property string imgsource: imagesource


    DropShadow {
           anchors.fill: cards
           horizontalOffset: 5
           verticalOffset: 5
           radius: 9.0
           samples: 16
           color: "#80000000"
          //source: cards
       }

Flipable {
    id: cards
    //width: passerbyGrid.width
    //height: passerbyGrid.width / 1.8 //units.gu(26)
    clip: true
   // x:0
    //y:0
    //transformOrigin: Item.Center
   // rotation:90
    width:parent.width
    height:parent.height


    back:  Item {
        x: 0
        height: parent.height
        width: parent.width
        clip: true


            Rectangle {
                width: parent.width
                height: parent.height
                color: colorCode
                radius: 0
                border.color: "black"
                border.width: 1
                anchors.horizontalCenter: parent.horizontalCenter

                Item {
                    anchors.right:parent.right
                    anchors.rightMargin:units.gu(1)
                    anchors.top:parent.top
                    anchors.topMargin:units.gu(1)
                    width: parent.width / 5 // units.gu(8)
                    height:parent.width / 12 //units.gu(4)
                    Icon {
                        width: /*units.gu(2) */ parent.width / 3.5
                        height: /*units.gu(2) */ parent.width / 3.5
                        name: "starred"
                        //z: -8
                        MouseArea {
                            anchors.fill: parent
                            preventStealing: true
                            //onClicked: if (saved == 0){Scripts.Cards_save(card,name,email,phone,company,"",motto,URL1,URL2,URL3,imgsource,cardback);cardslist.clear();OpenSeed.sync_cards(userid,3);Scripts.Temp_load(searchtext);}
                        }

                    }

                    Icon {
                        width: parent.width / 3.5 //units.gu(2)
                        height: parent.width / 3.5 //units.gu(2)
                        name: "help"
                        anchors.horizontalCenter: parent.horizontalCenter
                    }

                    Icon {
                        width: parent.width / 3.5 //units.gu(2)
                        height: parent.width / 3.5 //units.gu(2)
                        name: "delete"
                        anchors.right:parent.right

                        MouseArea {
                            anchors.fill: parent
                            preventStealing: true
                           // onClicked: if (saved == 0){Scripts.Delete_card(card);cardslist.clear();Scripts.Temp_load(searchtext);} else {
                            //                    Scripts.Delete_card(card);cardslist.clear();Scripts.Cards_load(searchtext);OpenSeed.sync_cards(userid,3);
                              //         }
                        }
                    }


                }

                Rectangle {
                    id:card_avatar_backing
                    width: parent.width / 3.5 //units.gu(12)
                    height: parent.width / 3.5 //units.gu(12)
                    x:5
                    y:5
                    color:"white"
                    border.color: "black"
                    border.width: 0.5
                    //radius: 10
                    clip:true

                    Image {
                        id:cardsava
                        anchors.fill:parent
                        anchors.margins: units.gu(.2)

                        source: imgsource
                    }
                  }

            Text {
                //x: 5
                id:nametag
                text: name
                font.pixelSize:  parent.width / 20 //units.gu(2.05)
                font.bold: true
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.left:card_avatar_backing.right
               anchors.leftMargin: units.gu(1.5)
                anchors.top: parent.top
                anchors.topMargin: units.gu(.5)
                wrapMode:Text.WordWrap

            }
            Text {
                id:comp
                anchors.left:card_avatar_backing.right
                anchors.leftMargin:units.gu(.3)
                anchors.top:nametag.bottom
                anchors.topMargin: parent.width / 25 //units.gu(2.4)

                font.pixelSize: parent.width / 25 //units.gu(1.8)
                text: "Company: "

                Text {
                    x:parent.width
                    text: company
                    anchors.top: parent.top
                    font.pixelSize: parent.width / 4 //units.gu(1.8)

                }
            }
            Text {
                id:pho

                anchors.left:card_avatar_backing.right
                anchors.leftMargin:units.gu(.3)
                anchors.top:comp.bottom
                anchors.topMargin:units.gu(.3)

                font.pixelSize: parent.width / 25 //units.gu(1.8)
                text: "Phone: "

                Text {
                    x:parent.width
                    text: '<a href="tel:'+phone+'">'+phone+'</a>'
                     anchors.top: parent.top
                    font.pixelSize: parent.width / 3.5 //units.gu(1.8)
                    onLinkActivated: Qt.openUrlExternally('tel:'+phone)

                }
            }
            Text {
                id:emai
                anchors.left:card_avatar_backing.right
                anchors.leftMargin:units.gu(.3)
                anchors.top:pho.bottom
                anchors.topMargin:units.gu(.3)

                font.pixelSize: parent.width / 25 //units.gu(1.8)
                text: "Email: "

                Text {
                    x:parent.width
                    text: '<a href="mailto:'+email+'">'+email+'</a>'
                     anchors.top: parent.top
                    font.pixelSize: parent.width / 3.5 //units.gu(1.8)
                    onLinkActivated: Qt.openUrlExternally('mailto:'+email)

                }
            }

            Text {
                id:motd
                width:parent.width - units.gu(1)
                anchors.left:parent.left
                anchors.leftMargin: units.gu(.5)
                anchors.top:emai.bottom
                anchors.topMargin: units.gu(2)
                anchors.bottom:indexcardnum.top
                anchors.bottomMargin: units.gu(1)

                font.pixelSize: (parent.width / 23) //units.gu(2)
                text:motto
                wrapMode: Text.WordWrap
                clip:true
            }

            Text {
                id:indexcardnum
                anchors.bottom:parent.bottom
                anchors.right:parent.right
                anchors.rightMargin:units.gu(1.8)

                font.pixelSize: units.gu(1.2)
                text: "card: "

                Text {
                    text: card
                    font.pixelSize: units.gu(1.2)
                x:parent.width
                //y:70
            }
            }


        }


    }



    front: Rectangle {
        x:0
        //width: passerbyGrid.width
        //height: passerbyGrid.height
        color: colorCode
        radius: 0
        border.color: "black"
        border.width: 1
        anchors.fill:parent
        clip: true
        Image { x:0; source: "img/connect.png" ; anchors.fill:parent;}
        Image { id:cardbackImg; x:0; source: cardback ; anchors.fill:parent;}

    }

    transform: Rotation {
        id: rotation
        origin.x: cards.width/2
        origin.y: cards.height/2
        axis.x: 1; axis.y: 0; axis.z: 0     // set axis.y to 1 to rotate around y-axis
        angle: 0    // the default angle
    }

    states: [State {
        name: "back"
        PropertyChanges { target: rotation; angle: 180; }
        PropertyChanges {target:cardItem; z: 4}
        when:  currentcard == card // && cards.flipped
       // when: cards.flipped
    }

    ]

    transitions: Transition {
        NumberAnimation { target: rotation; property: "angle"; duration: 400 }
    }

    MouseArea {


        x:0
        y:0
        width:if(cards.side == 1) {units.gu(2) } else {parent.width}
        height:if(cards.side == 1) {parent.height - units.gu(3) } else {parent.height}
       onClicked: {currentcard = card; cards.flipped = !cards.flipped; if(cards.side == 0) {if(layouts.width >= units.gu(mobile_vert)) {Scripts.Show_sites(card);} } else { /*pages = 0;*/}

        }



    }


}

Timer {
     interval:8000; running: true; repeat: true
     onTriggered: {
                //console.log(Scripts.removeOld(card));
         if(Scripts.removeOld(card) == card) {console.log("destroying "+card);
                                                                    cardItem.destroy();
         Scripts.Delete_card(card);
         } }
}

}



