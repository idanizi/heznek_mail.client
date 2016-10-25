/**
 * Created by Idan Izicovich on 2016-07-26.
 * @fileOverview
 * @name Main - app.js
 * @author Idan Izicovich, email: idanizi@gmail.com, cell: 0545921327
 * @version 0.0.1
 * @since 0.0.1
 * @description
 * This is a web-client written in js using angular (version 1.3.x and above). for applying online form
 * for Heznek-La'atid company.
 * @see <a href="https://github.com/emailjs"> emailjs </a>
 * */
(function main(angular) {
    'use strict';

    var app = angular.module('Main', []);

    // TODO: (nice-to-have) create configuration: routes, divide code to controller and view.
    // function configuration($routeProvider) {
    //     $routeProvider
    //         .when('/', {
    //             templateUrl: 'form.view.html',
    //             controller: 'FormController',
    //             controllerAs: 'vm'
    //         })
    //         .otherwise({redirectTo: '/'});
    // }

    function formController($scope, mailService) {
        // var vm = this;
        // vm.data = data;
        // vm.sendMail = sendMail;

        /////////////////////////////
        ///// fields and methods ////
        $scope.data = initData();
        $scope.myForm = {};
        $scope.inputs = initInputs();
        console.info($scope.inputs);
        $scope.sendMail = sendMail;
        $scope.reset = reset;
        $scope.isInValid = isInValid;
        $scope.isValid = isValid;
        $scope.validationClass = validationClass;
        $scope.checkRules = checkRules;
        /////////////////////////////

        /**
         * @private
         * @return {object} inputs
         */
        function initInputs() {
            return {
                index: 0,
                array: [
                    {
                        // "instance": {"default": $scope.firstName, "inner": $scope.myForm.firstName},
                        "model": "firstName",
                        "name": "firstName",
                        "id": "firstName",
                        "type": "text",
                        "label": "שם פרטי",
                        "placeholder": "שם פרטי",
                        "helpText": "אותיות בלבד",
                        "helpID": "firstNameHelp" // firstName end
                    },
                    {
                        // "instance": {"default": $scope.firstName, "inner": $scope.myForm.firstName},
                        "model": "email",
                        "name": "email",
                        "id": "email",
                        "type": "email",
                        "label": "אימייל",
                        "placeholder": "כתובת דואר אלקטרוני תקנית",
                        "helpText": "<a href=https://he.wikipedia.org/wiki/%D7%93%D7%95%D7%90%D7%A8_%D7%90%D7%9C%D7%A7%D7%98%D7%A8%D7%95%D7%A0%D7%99 target=_blank>איך לכתוב כתובת דואר תקינה?</a>",
                        "helpID": "emailNameHelp" // firstName end
                    }
                    // {}
                    // ,
                    // {}
                    // ,
                    // {}
                    // ,
                    // {}
                ] // array
            }; // return
        }// function


        /**
         * @private
         * @returns {string} Date of today
         */
        function initDate() {
            var d = new Date();
            return (d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
        }

        /**
         * @private
         * @returns {object} data
         */
        function initData() {
            return {
                customRules: {

                    test: function (x) {
                        return true;
                    }

                },
                dateNow: initDate(),
            }
                ;
        }

        /**
         * @public
         * @returns {boolean} true in case the costume rules pass with the input argument
         */
        function checkRules(input, rules) {
            for (var rule in rules) {
                console.debug(rule);
                if (!rule(input.value)) {
                    return false;
                }
            }

            return true;
        }

        /**
         * @public
         * @description
         * Checks if the input is <b>invalid</b>, for ng-show/hide and classes usage.
         * @param input
         * @returns {boolean} validation
         */
        function isInValid(input, rules) {
            console.log('isInValid input: ', input)
            console.log('isInValid $scope: ', $scope);
            var inputInstance = $scope[input];
            if (inputInstance === undefined) {
                inputInstance = $scope.myForm[input];
                if (inputInstance === undefined) {
                    inputInstance = input;
                    if (inputInstance === undefined) {
                        console.warn('inputInstance undefined:', input);
                    }
                }

            }
            return (inputInstance.$invalid || !checkRules(inputInstance, rules)) && inputInstance.$dirty;
        }

        /**
         * @public
         * @description
         * Checks if the input is <b>valid</b>, for ng-show/hide and classes usage.
         * @param input
         * @return {boolean} validation
         */
        function isValid(input, rules) {
            var inputInstance = $scope[input];
            if (inputInstance === undefined) {
                inputInstance = $scope.myForm[input];
                if (inputInstance === undefined) {
                    inputInstance = input;
                    if (inputInstance === undefined) {
                        console.warn('inputInstance undefined:', input);
                    }
                }
            }
            return inputInstance.$valid && checkRules(inputInstance, rules) && inputInstance.$dirty;
        }

        /**
         * @public
         * @description
         * Building validation class (for bootstrap css purposes)
         * @param input
         * @return {{has-error: boolean, has-success: boolean}} class object for one form-group
         * (bootstrap class)
         */
        function validationClass(input, rules) {
            console.log('validationClass input: ', input);
            console.log('validationClass $scope: ', $scope);
            return {
                'has-error': isInValid(input, rules),
                'has-success': isValid(input, rules)
            }
        }

        /**
         * @public
         * @description
         * sends the mail, public method for the $scope
         */
        function sendMail() {
            mailService.sendMail($scope.data);
        }

        function reset() {
            $scope.data = initData();
        }
    }

    // TODO: (nice-to-have) move to mail.service.js file (for Best Practice).
    function mailService($filter) {
        return {
            sendMail: sendMail
        }

        function sendMail(data) {

            /**
             * @name emailData {json}
             * @description
             * a json object holding the data need to be sent to the server
             * */
            var emailData = {
                first_name: data.firstName,
                last_name: data.lastName,
                sex: data.sex,
                id: data.id,
                submit_date: data.dateNow,
                birthday: data.birthday,
                n_siblings: data.nSiblings,
                cell: data.cell,
                email: data.email,
                parents_location: data.parentsLocation,
                my_location: data.myLocation,
                father_origin: data.fatherOrigin,
                mother_origin: data.motherOrigin,
                high_school_name: data.highSchoolName,
                former_programs: data.formerPrograms,
                current_institution: data.currentInstitution,
                current_year: data.currentYear,
                major: data.major,
                secondary: data.secondary,
                disabilities: data.disabilities,
                activity: data.activity,
                reason: data.reason,
                service: data.service,
                relationship_status: data.relationshipStatus,
                social_economic: data.socialEconomic,
                life_story: data.lifeStory,
                hobby: data.hobby,
                other_scholarships: data.otherScolarships,
                comments: data.comments,
                /**
                 * @namespace
                 * @name attachments
                 * @todo Allow attachments - highSchoolGraduationFile, passportPicture, idPicture, salary, serviceFreePic, schoolApproval, recommend.
                 * @description
                 *  this part requires to pay more money for having attachments. by upgrading the account of
                 *  EmailJS - <a href='https://dashboard.emailjs.com/account'>https://dashboard.emailjs.com/account</a>
                 *  <br/>
                 *  <br/>
                 *  Option #1: upgrade the account to allow attachments.<br/>
                 *  Option #2: create server side using node.js with server engine (like expressJS) and apply the
                 *  emailJS API by 'eleith'. can be found at:
                 *  https://github.com/eleith/emailjs
                 *  more info: <br/>
                 *  https://github.com/emailjs
                 *  http://emailjs.org/ <br/>
                 *  by this option, extra payment will be saved!
                 *  @see https://dashboard.emailjs.com/account
                 *  @see https://github.com/emailjs
                 *  @see http://emailjs.org/
                 *  */
                high_school_graduation_file: data.highSchoolGraduationFile,
                passport_picture: data.passportPicture,
                id_picture: data.idPicture,
                salary: data.salary,
                service_free_picture: data.serviceFreePic,
                school_approval: data.schoolApproval,
                recommend: data.recommend // end of json. no ',' (comma) needed.
            };
            console.debug('emailData:', data);

            /**
             * @function logResponse
             * @description
             * when sending the email returns OK - do logging.<br/>
             * is can be extended to do more options.
             * @param res {json} the response from the server
             * */
            function logResponse(res) {
                console.info('the message had sent, the response from the server is ' + $filter('json')(res));
            }

            /**
             * @function logError
             * @description deal with errors
             * @param err {json} the error from the server
             * */
            function logError(err) {
                console.error('sendMail - an error occur: ' + err);
            }

            /**
             * @function 'emailjs.send'
             * @param service {string}
             * @param template {string}
             * @param email {json} email data
             * @description
             * calling the emailjs service that sends the email
             * */
            emailjs.send("default_service", "template_scholarReq", emailData)
                .then(logResponse)
                .catch(logError);
        }
    }

    app
    // .config(configuration)
        .controller('FormController', formController)
        .factory('mailService', mailService)

})(angular);
