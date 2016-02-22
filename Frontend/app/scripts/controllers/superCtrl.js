'use strict';

/**
 * @ngdoc function
 * @name kritisformularApp.controller:EinsCtrl
 * @description
 * # Super Controller der in allen Views vorhanden ist
 * Controller of the kritisformularApp
 */
angular.module('kritisformularApp')
  .controller('SuperCtrl', function ($baasbox, $scope) {

    this.statusInfo = {
        feedback : false,
        status : ''
    }

    this.data = {
        kontakt : {
            vorname : "",
            nachname : "",
            organisation : "",
            organisationRolle : "",
            email : "",
            telefonnummer : "",
            kritis : ""
        },
        vorfall : {
            entdeckungszeitpunkt : {
                date : "",
                time : ""
            },
            startzeitpunkt : {
                date : "",
                time : ""
            },
            endzeitpunkt : {
                date : "",
                time : ""
            },
            dauertAn : "",
            cia : "",
            funktionaleAuswirkungen : "",
            unauthZugriffVertrInfo : ""

        },
        angriff : {
            festgestelltDurch : "",
            festgestelltDurchDetails : "",
            vektor : {
                miskonfiguration : {
                    checked : false,
                    text : "Misskonfiguration",
                    optionenChecked : []
                },
                usb : {
                    checked : false,
                    text : "USB-Geräte",
                    optionenChecked : []
                },
                email : {
                    checked : false,
                    text : "E-Mail",
                    optionenChecked : []
                },
                evalCheck : {
                    checked : false,
                    text : "Unzureichende Eingabevalidierung",
                    optionenChecked : []
                },
                botnetz : {
                    checked : false,
                    text : "Botnetz",
                    optionenChecked : []
                },
                identTheft : {
                    checked : false,
                    text : "Identitätsdiebstahl",
                    optionenChecked : []
                },
                ausnutzenSichlueck : {
                    checked : false,
                    text : "Sicherheitslücke",
                    optionenChecked : []
                },
                socialEngineering : {
                    checked : false,
                    text : "Social Engineering",
                    optionenChecked : []
                },
                ermoeglichtBeschreibungSonstiges : ""
            },
            art : {
                schadprogramm : {
                    checked : false,
                    text : "Schadprogramm",
                    optionenChecked : []
                },
                dos : {
                    checked : false,
                    text : "Denial-of-Service",
                    optionenChecked : []
                },
                codeExec : {
                    checked : false,
                    text : "Beliebige Codeausführung"
                },
                artBeschreibungSonstiges : ""
            },
            zweck : {
                zweckErpressung :{
                    checked : false,
                    text : "Erpressung"
                },
                zweckIdent : {
                    checked : false,
                    text : "Identitätsdiebstahl"
                },
                zweckVertraulInfo : {
                    checked : false,
                    text : "Entwendung vertraulicher Informationen"
                },
                zweckGeschaeftstaet : {
                    checked : false,
                    text : "Störung der Geschäftstätigkeit"
                },
                zweckSabotage : {
                    checked : false,
                    text : "Sabitage / Denial-of-Service"
                },
                zweckDatenmanipulation : {
                    checked : false,
                    text : "Manipulation von Daten"
                },
                zweckSystemressourcenAusnutzen : {
                    checked : false,
                    text : "Nutzung von Systemressourcen"
                },
                zweckDefacement : {
                    checked : false,
                    text : "Defacement"
                },
                zweckBeschreibungSonstiges : ""
            },
            SystemHersteller : "",
            SystemProdukt : "",
            systemBeschreibungSonstiges : "",
            empfehlung : "",
            cveEigenerEintrag : "",
            massnahmenErgriffen : "",
            aufwandBehebung : "",
            behoben : ""
        }
    };

    this.init = function() {
        $baasbox.init({
            url: "http://localhost:9000",
            appCode: 1234567890
        });
        $baasbox.login('webapp', 'webapp')
    }

    this.finish = function(){
        $baasbox.addDocument('incidents', this.data)
            .then(function(result){
                if(result.status == 200){
                    $scope.super.statusInfo.feedback = true;
                    $scope.super.statusInfo.status = 'success';
                }
            }, function(err) {
                if(err.status != 200){
                    $scope.super.statusInfo.feedback = true;
                    $scope.super.statusInfo.status = 'error'
                }
            })
    };
    this.addOptionenChecked = function(item){
      console.log(item);
    }

    //ermöglicht die Darstellung von Zeilenumbrüchen im Popover
    this.getPopoverContent = function(json) {
        return json
    }

  });
