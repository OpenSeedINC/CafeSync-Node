import QtQuick 2.2
import Ubuntu.Components 1.2
import Ubuntu.Components.Pickers 0.1
import Ubuntu.Components.ListItems 1.0 as ListItem
import Ubuntu.Content 1.1
import Ubuntu.Layouts 1.0
import Ubuntu.Web 0.2
import Ubuntu.Components.Popups 1.0
import QtQml 2.2
import QtGraphicalEffects 1.0

import QtQuick.LocalStorage 2.0 as Sql
import "main.js" as Scripts
import "openseed.js" as OpenSeed


/*!
    \brief MainView with a Label and Button elements.
*/

//Item {
MainView {
    // objectName for functional testing purposes (autopilot-qt5)
    objectName: "mainView"
    id:appWindow

    // Note! applicationName needs to match the "name" field of the click manifest
    applicationName: "cafesync-node.vagueentertainment"

    /*
     This property enables the application to change orientation
     when the device is rotated. The default is false.
    */
    //automaticOrientation: true

    // Removes the old toolbar and enables new features of the new header.
   // useDeprecatedToolbar: false

    width: units.gu(300)
    height: units.gu(175)



    //Component.onCompleted: {
        //Theme.name = "Ubuntu.Components.Themes.Ambiance"
   //        Theme.name = "Ubuntu.Components.Themes.SuruDark"


//}

    property string usercompany: ""

    property string devId: "Vag-01001011"
   property string appId: "vagCaf-01010"
    property string osUsername: ""
    property string osEmail: ""
    property string userid: ""

    property string remotesaved: ""
    property string cardsyncsaved:""
    property string cardsynctemp:""
    property string createdcards
    property int cardloaded: 0
    property int numofcards: 0
    property int currentcard: -1
    property int countdown: 10
    property int index: 0
    property string webview1:""
    property int pages: 0
    property int lastx: 0
    property int lasty: 0




    Component {

        id: firstrun
        Dialog {
                     id: dialogue
                     title: "Connect to OpenSeed"
                     text: "CafeSync uses the Openseed network for App and User authentication."


                     TextField{
                         id:osUsernameField
                         placeholderText: "User Name"
                        horizontalAlignment: Text.horizontalCenter
                         text:osUsername

                     }
                     TextField{
                         id:osEmailField
                         placeholderText: "example@email.com"
                         horizontalAlignment: Text.horizontalCenter
                         text:osEmail

                     }

                    Row {
                        spacing: units.gu(10)
                     Button {
                         text: "Okay"
                         onClicked: OpenSeed.oseed_auth(osUsernameField.text,osEmailField.text),PopupUtils.close(dialogue)

                     }
                     Button {
                         text: "Cancel"
                         onClicked: PopupUtils.close(dialogue)
                     }
                    }

                 }

    }



    Component.onCompleted: {
            //Theme.name = "Ubuntu.Components.Themes.Ambiance"
            Theme.name = "Ubuntu.Components.Themes.SuruDark"

                Scripts.load_Card();
               OpenSeed.retrieve_data(userid);
                //if(userid.length > 5) {OpenSeed.sync_cards(userid,1);}
                OpenSeed.get_list(userid,"saved");
                cardssync.running = true;



    }

    Timer {
        id:cardssync
        interval:20000; running: false; repeat: true
            onTriggered: {

                 OpenSeed.retrieve_data(userid);

                Scripts.Temp_load();

                //Scripts.Cards_load();



          }
        }






//   Page {
       // title: i18n.tr("Cafe Sync - "+usercompany)

        Item {
            id:backboard
            width:parent.width * 0.99
            height:parent.height * 0.99
            anchors.centerIn: parent
            clip:true

            Rectangle {
                id:background1
                width:parent.width
                height:parent.height
                color:"gray"
                border.color:"gold"
                border.width:3
                Image {
                    source:"img/29-Cork.jpg"
                    anchors.fill:parent
                    fillMode:Image.Tile
                }
            }
            DropShadow {
                   anchors.fill: clock
                   horizontalOffset: 3
                   verticalOffset: 3
                   radius: 8.0
                   samples: 16
                   color: "#80000000"
                   source: clock
               }

            Clock {
                id:clock
                anchors.bottom:parent.bottom
                anchors.right:parent.right
                anchors.margins: 10
                width:150
                height:150
                number:countdown


            }

            Text {
                anchors.top:parent.top
                anchors.left:parent.left
                anchors.margins:10
                text:usercompany
                font.pixelSize:parent.width * 0.04
                color:"white"
                z:4

                DropShadow {
                    anchors.fill: parent
                    horizontalOffset: 3
                    verticalOffset: 3
                    radius: 8.0
                    samples: 16
                    color: "#80000000"
                    source: parent
                }
            }

            Timer {
                interval:1000; running: true; repeat: true
                    onTriggered: {if(countdown > 0) { countdown = countdown - 1;
                            if (countdown == 4) {
                            currentcard = cardsynctemp.split(",")[Math.floor(Math.random() * numofcards)];
                            Scripts.Show_sites(currentcard)
                            }
                            if (countdown == 1) {
                                console.log("the Current card is "+currentcard);
                                sidebar.state = "Active";
                                mainBoard.state = "Active";

                            }
                            if (countdown == 10) {
                                sidebar.state = "InActive";
                                mainBoard.state = "InActive";

                            }
                            if (countdown == 9) {
                                currentcard = -1;
                            }
                            if (countdown == 8) {
                                webview1 = "empty.html";
                            }

                        } else {
                            countdown = 30;
                        }
                    }
            }


            Timer {
                interval:1000; running: false; repeat: false
                    onTriggered: {

                         //OpenSeed.retrieve_data(userid);

                        Scripts.Temp_load();

                        //Scripts.Cards_load();

                        //Scripts.createCard(10,20,parent.width,parent.height);
                        //console.log("tick");
                  }
                }

           /*Timer {
                interval:8000; running: true; repeat: true
                    onTriggered: {
                        Scripts.removeOld();
                    }
            } */

        }

    SideBar {
        id:sidebar
        width:parent.width * 0.18
        height:parent.height
        state:"InActive"
    }

    Board {
        id:mainBoard
        width:parent.width * 0.82
        height:parent.height
        x:parent.width * 0.18
        state:"InActive"
    }
//}

}
