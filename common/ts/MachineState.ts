///<reference path='../../include.d.ts'/>
module firemote {
	export class MachineState {
		message: string = "FirePick machine state";
		stateId: number = 1;
		logLevel: string = "INFO";
		firefuse: Boolean = true;
		gantries: Gantry[] = [];
		trayFeeders: TrayFeeder[] = [];
		pcbFeeders: PcbFeeder[] = [];
		firestep: FireStep = new FireStep();

		constructor(obj = undefined) {
			if (typeof obj === 'string') {
			  obj = JSON.parse(obj);
			}
			if (typeof obj !== 'undefined') {
			  if (obj.hasOwnProperty("message")) this.message = obj.message;
			  if (obj.hasOwnProperty("stateId")) this.stateId = obj.stateId;
			  if (obj.hasOwnProperty("logLevel")) this.logLevel = obj.logLevel;
			  if (obj.hasOwnProperty("firefuse")) this.firefuse = obj.firefuse;
			  if (obj.hasOwnProperty("firestep")) this.firestep = obj.firestep;
				if (obj.gantries && obj.gantries.length > 0) {
				  for (var i = 0; i < obj.gantries.length; i++) {
					  this.gantries.push(new Gantry(obj.gantries[i]));
					}
				}
				if (obj.trayFeeders && obj.trayFeeders.length > 0) {
				  for (var i = 0; i < obj.trayFeeders.length; i++) {
					  this.trayFeeders.push(new TrayFeeder(obj.trayFeeders[i]));
					}
				}
				if (obj.pcbFeeders && obj.pcbFeeders.length > 0) {
				  for (var i = 0; i < obj.pcbFeeders.length; i++) {
					  this.pcbFeeders.push(new PcbFeeder(obj.pcbFeeders[i]));
					}
				}
			}
			this.gantries.length > 0 || this.gantries.push(new Gantry());
			this.trayFeeders.length > 0 || this.trayFeeders.push(new TrayFeeder());
			this.pcbFeeders.length > 0 || this.pcbFeeders.push(new PcbFeeder());
		}

		clone(): MachineState {
			return new MachineState(this);
		}
  }
}

exports.MachineState = firemote.MachineState;
