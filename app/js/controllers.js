/*
controllers.js https://github.com/firepick1/FireMote/wiki

Copyright (C) 2013  Karl Lew, <karl@firepick.org>

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/

'use strict';
var controllers = angular.module('FireMote.controllers', []);

controllers.controller('JogCtrl', ['$scope','$location',function(scope, location) {
		scope.view = "JOG";
}]);

controllers.controller('CameraCtrl', ['$scope','$location',function(scope, location) {
		scope.view = "CAMERA";

		scope.lightClass = function(head) {
			return head.light ? "checkbox checkbox-on" : "checkbox";
		}
		scope.lightClick = function(head) {
			head.light = !head.light;
		}
}]);

controllers.controller('SpindleCtrl', ['$scope','$location',function(scope, location) {
		scope.view = "SPINDLE";

		scope.rotateStyle = function(head) {
			return "-moz-transform: rotate(" + head.angle + "deg);" +
				"-webkit-transform: rotate(" + head.angle + "deg);" +
				"-o-transform: rotate(" + head.angle + "deg)";
		}
		scope.vacuumClick = function(spindle) {
			spindle.on = !spindle.on;
			if (spindle.on) {
				spindle.part = spindle.pos == 0;
			} else {
				spindle.part = false;
			}
		}
		scope.vacuumClass = function(spindle) {
			return spindle.on ? "checkbox-on" : "";
		}
}]);

controllers.controller('StatusCtrl', ['$scope','$location',function(scope, location) {
		scope.view = "STATUS";
}]);

controllers.controller('CalibrateCtrl', ['$scope','$location','Status', function(scope, location, Status) {
		scope.view = "CALIBRATE";

		scope.calibrate = function () {
			alert("calibrating...");
			scope.updateStatus();
			scope.axisGantry.calibrate = false;
			scope.axisTrayFeeder.calibrate = false;
			scope.axisPcbFeeder.calibrate = false;
		}
		scope.calibrateCheckboxClass = function(axis) {
			return axis.calibrate ? "checkbox-on" : "";
		}
		scope.calibrateCheckboxClick = function(axis) {
			axis.calibrate = !axis.calibrate;
		}
		scope.calibrateClass = function() {
			return scope.axisGantry.calibrate 
				|| scope.axisTrayFeeder.calibrate 
				|| scope.axisPcbFeeder.calibrate
				? "" : "hide";
		}
}]);

controllers.controller('MainCtrl', ['$scope','$location','Status', 'REST', function(scope, location, Status, REST) {
		scope.view = "MAIN";
		scope.imageLarge = false;
		scope.head = {angle:0, light: true}; // default
		scope.axisGantry = {pos:0, posMax:624, calibrate:false}; // default
		scope.axisTrayFeeder = {pos:0, posMax:300, calibrate:false}; // default
		scope.axisPcbFeeder = {pos:0, posMax:300, calibrate:false}; // default
		scope.spindleLeft = {pos:0, side:"left", on:true, part:true}; // default
		scope.spindleRight = {pos:100, side:"right", on:false, part:false}; // default
		scope.control = location.path() || "/status";
		scope.isActive = [];

		scope.camImageClick = function() {
			scope.imageLarge = !scope.imageLarge;
		}
		scope.camImageHeight = function() {
			return scope.imageLarge ? "100%" : "65px";
		}
		scope.ctrlBtnStyle = function(control) {
			return (scope.control === control) ?
				"background-color: #FA0; width:105%; border:none; height: 40px;" :
				"background-color: #efefef; border:none; height: 40px;";
		}
		scope.demoClick = function() {
			REST.setMock(!REST.getMock());
			scope.updateStatus();
		}
		scope.hsliderLeft = function() {
			return (scope.axisGantry.pos * (700 - 36) / scope.axisGantry.posMax); 
		}
		scope.hsliderNumberClass = function() {
			return scope.head.light ? "hslider-number hslider-number-light": "hslider-number";
		}
		scope.hsliderSpindleClass = function(spindle) {
			var result = "spindle spindle-" + spindle.side;

			result += spindle.on ? " spindle-on" : "";
			result += spindle.pos == 0 ? " spindle-down" : "";
			result += spindle.part ? " spindle-loaded" : "";

			return result;
		}
		scope.viewControl = function(control) {
			location.path(control);
			scope.control = control;
		}
		scope.updateStatus = function() {
			Status.get(function(data){
				scope.status = data;
				scope.axisGantry = data.gantry || scope.axisGantry;
				scope.axisTrayFeeder = data.trayFeeder || scope.axisTrayFeeder;
				scope.axisPcbFeeder = data.pcbFeeder || scope.axisPcbFeeder;
				scope.head = data.head || scope.head;
				scope.spindleLeft = data.spindleLeft || scope.spindleLeft;
				scope.spindleRight = data.spindleRight || scope.spindleRight;
			});
		}

		scope.updateStatus();
}]);
