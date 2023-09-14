const locations = {
	CGY : {
		name : "Calgary",
		salesEmail : "evan.singer@vesselpackaging.com",
		warehouse : {
			canFormats : ["355ml STD", "473ml STD", "355ml Sleek"],
			cans : {
				"355ml STD" : {
					volume : 0.355,
					layerFactor : 389,
					labelType : {
						"Blank Cans" : {
							min : 10,
							max : 420,
							palletOptions : [["Half/Demie",11],["Tall/Grande",17],["Full/Complète",21]]
						},	
						"Shrink Sleeve" : {
							min : 3,
							max : 840,
							palletOptions : [["Half/Demie",10],["Full/Complète",17]]
						},
                        "SS Label" : {
							min : 3,
							max : 840,
							palletOptions : [["Half/Demie",10],["Full/Complète",17]]
						},
						"PSL" : {
							min : 3,
							max : 88,
							palletOptions : [["Half/Demie",5],["Full/Complète",11]]
						},
                        "PSL Label" : {
							min : 3,
							max : 88,
							palletOptions : [["Half/Demie",5],["Full/Complète",11]]
						}
					}
				},	
				"473ml STD" : {
					volume : 0.473,
					layerFactor : 389,
					labelType : {
						"Blank Cans" : {
							min : 8,
							max : 640,
							palletOptions : [["Half/Demie",8],["Short/Courte",13],["Full/Complète",16]]
						},	
						"Shrink Sleeve" : {
							min : 3,
							max : 520,
							palletOptions : [["Half/Demie",7],["Full/Complète",13]]
						},
                        "SS Label" : {
							min : 3,
							max : 520,
							palletOptions : [["Half/Demie",7],["Full/Complète",13]]
						},
						"PSL" : {
							min : 3,
							max : 90,
							palletOptions : [["Half/Demie",5],["Full/Complète",9]]
						},
                        "PSL Label" : {
							min : 3,
							max : 90,
							palletOptions : [["Half/Demie",5],["Full/Complète",9]]
						}
					}
				},
				"355ml Sleek" : {
					volume : 0.355,
					layerFactor : 506,
					labelType : {
						"Blank Cans" : {
							min : 10,
							max : 420,
							palletOptions : [["Half/Demie",8],["Full/Complète",16]]
						},	
						"Shrink Sleeve" : {
							min : 3,
							max : 840,
							palletOptions : [["Half/Demie",10],["Full/Complète",13]]
						},
                        "SS Label" : {
							min : 3,
							max : 840,
							palletOptions : [["Half/Demie",10],["Full/Complète",13]]
						},
						"PSL" : {
							min : 3,
							max : 88,
							palletOptions : [["Half/Demie",5],["Full/Complète",9]]
						},
                        "PSL Label" : {
							min : 3,
							max : 88,
							palletOptions : [["Half/Demie",5],["Full/Complète",9]]
						}
					}
				}
			},
			tray : {
				format : "Bundles / Paquets",
				units : 50,
				max : 200,
				types : ["Standard", "Sleek"]},
			end : {
				max : 624,
				types : ["202 LOE REC Epoxy", "202 SuperEnd REC Epoxy"]
			},
			paktechTypes: ["4pk Black (788/box)","6pk Black (510/box)"]
		},
		mobileCanning:{
			labelTypes : ["Silver Bullet / Vierge", "PSL/EAC", "Shrink Sleeve / Manchon rétractable", "Printed/Imprimée", "Cust. Provided/Fourni par le client"],
			canFormats : ["355ml STD", "473ml STD", "355ml Sleek"],
			trayTypes : ["Standard", "Sleek"],
			paktechTypes: ["4pk Black (788/box)","6pk Black (510/box)"]
		}
	},

	VAN : {
		name : "Vancouver",
		salesEmail : 'evan.singer@vesselpackaging.com',
		warehouse : {
			canFormats : ["355ml STD", "473ml STD", "355ml Sleek", "250ml Slim"],
			cans : {
				"355ml STD" : {
					volume : 0.355,
					layerFactor : 389,
					labelType : {
						"Blank Cans" : {
							min : 10,
							max : 420,
							palletOptions : [["Half/Demie",10],["Half/Demie",11],["Tall/Grande",17],["Full/Complète",21]]
						},
						"Printed" : {
							min : 10,
							max : 420,
							palletOptions : [["Half/Demie",10],["Half/Demie",11],["Tall/Grande",17],["Full/Complète",21]]
						},	
						"Shrink Sleeve" : {
							min : 3,
							max : 680,
							palletOptions : [["Half/Demie",10],["Full/Complète",17]]
						},
                        "SS Label" : {
							min : 3,
							max : 680,
							palletOptions : [["Half/Demie",10],["Full/Complète",17]]
						},
						"PSL" : {
							min : 3,
							max : 110,
							palletOptions : [["Half/Demie",5],["Full/Complète",11]]
						},
                        "PSL Label" : {
							min : 3,
							max : 110,
							palletOptions : [["Half/Demie",5],["Full/Complète",11]]
						}
					}
				},	
				"473ml STD" : {
					volume : 0.473,
					layerFactor : 389,
					labelType : {
						"Blank Cans" : {
							min : 8,
							max : 320,
							palletOptions : [["Half/Demie",8],["Short/Court",13],["Full/Complète",16]]
						},	
						"Printed" : {
							min : 8,
							max : 320,
							palletOptions : [["Half/Demie",8],["Short/Court",13],["Full/Complète",16]]
						},
						"Shrink Sleeve" : {
							min : 3,
							max : 560,
							palletOptions : [["Half/Demie",7],["Full/Complète",13]]
						},
                        "SS Label" : {
							min : 3,
							max : 560,
							palletOptions : [["Half/Demie",7],["Full/Complète",13]]
						},
						"PSL" : {
							min : 3,
							max : 90,
							palletOptions : [["Half/Demie",5],["Full/Complète",9]]
						},
                        "PSL Label" : {
							min : 3,
							max : 90,
							palletOptions : [["Half/Demie",5],["Full/Complète",9]]
						}
					}
				},
				"355ml Sleek" : {
					volume : 0.355,
					layerFactor : 506,
					labelType : {
						"Blank Cans" : {
							min : 10,
							max : 320,
							palletOptions : [["Half/Demie",8],["Full/Complète",16]]
						},
						"Printed" : {
							min : 10,
							max : 320,
							palletOptions : [["Half/Demie",8],["Full/Complète",16]]
						},	
						"Shrink Sleeve" : {
							min : 3,
							max : 560,
							palletOptions : [["Half/Demie",6],["Full/Complète",13]]
						},
                        "SS Label" : {
							min : 3,
							max : 560,
							palletOptions : [["Half/Demie",6],["Full/Complète",13]]
						},
						"PSL" : {
							min : 3,
							max : 90,
							palletOptions : [["Half/Demie",5],["Full/Complète",9]]
						},
                        "PSL Label" : {
							min : 3,
							max : 90,
							palletOptions : [["Half/Demie",5],["Full/Complète",9]]
						}
					}
				},
				"250ml Slim" : {
					volume : 0.250,
					layerFactor : 575,
					labelType : {
						"Blank Cans" : {
							min : 10,
							max : 340,
							palletOptions : [["Half/Demie",8],["Full/Complète",17]]
						},
						"Printed" : {
							min : 10,
							max : 340,
							palletOptions : [["Half/Demie",8],["Full/Complète",17]]
						},		
						"Shrink Sleeve" : {
							min : 3,
							max : 680,
							palletOptions : [["Half/Demie",10],["Full/Complète",17]]
						},
                        "SS Label" : {
							min : 3,
							max : 680,
							palletOptions : [["Half/Demie",10],["Full/Complète",17]]
						},
						"PSL" : {
							min : 3,
							max : 170,
							palletOptions : [["Half/Demie",5],["Full/Complète",17]]
						},
                        "PSL Label": {
							min : 3,
							max : 170,
							palletOptions : [["Half/Demie",5],["Full/Complète",17]]
						}
					}
				}
			},
			tray : {
				format : "Bundles / Paquets",
				units : 50,
				max : 200,
				types : ["Standard", "Sleek", "Slim"]
			},
			end : {
				max : 624,
				types : ["200 B64 (250 ml Slim Cans Only)", "202 LOE REC Epoxy", "202 LOE 10 STATE USA BPANI", "202 SuperEnd REC Epoxy", "202 SuperEnd 10 STATE USA BPANI"]
			},
			paktechTypes: ["4pk Black (788/box)","6pk Black (510/box)","4pk White (788/box)","6pk White (510/box)"]
		},
		mobileCanning : {
			labelTypes : ["Silver Bullet / Vierge", "PSL/EAC", "Shrink Sleeve / Manchon rétractable", "Printed/Imprimée", "Cust. Provided/Fourni par le client"],
			canFormats : ["355ml STD", "473ml STD", "355ml Sleek", "250ml Slim"],
			trayTypes : ["Standard", "Sleek", "Slim"],
			paktechTypes: ["4pk Black (788/box)","6pk Black (510/box)","4pk White (788/box)","6pk White (510/box)"]
		}
	},

	MISS : {
		name : "Mississauga",
		salesEmail : 'evan.singer@vesselpackaging.com',
		warehouse : {
			canFormats : ["355ml STD", "473ml STD", "355ml Sleek", "250ml Slim"],
			cans : {
				"355ml STD" : {
					volume : 0.355,
					layerFactor : 389,
					labelType : {
						"Blank Cans" : {
							min : 11,
							max : 420,
							palletOptions : [["Half/Demie",11],["Tall/Grande",17],["Full/Complète",21]]
						},
						"Printed" : {
							min : 11,
							max : 420,
							palletOptions : [["Half/Demie",11],["Tall/Grande",17],["Full/Complète",21]]
						},
						"Shrink Sleeve" : {
							min : 3,
							max : 640,
							palletOptions : [["Half/Demie",10],["Full/Complète",16]]
						},
                        "SS Label" : {
							min : 3,
							max : 640,
							palletOptions : [["Half/Demie",10],["Full/Complète",16]]
						},
						"PSL" : {
							min : 3,
							max : 100,
							palletOptions : [["Half/Demie",5],["Full/Complète",10]]
						},
                        "PSL Label" : {
							min : 3,
							max : 100,
							palletOptions : [["Half/Demie",5],["Full/Complète",10]]
						}
					}
				},	
				"473ml STD" : {
					volume : 0.473,
					layerFactor : 389,
					labelType : {
						"Blank Cans" : {
							min : 8,
							max : 320,
							palletOptions : [["Half/Demie",8],["Short/Courte",13],["Full/Complète",16]]
						},
						"Printed" : {
							min : 8,
							max : 320,
							palletOptions : [["Half/Demie",8],["Short/Courte",13],["Full/Complète",16]]
						},	
						"Shrink Sleeve" : {
							min : 3,
							max : 560,
							palletOptions : [["Half/Demie",7],["Full/Complète",13]]
						},
                        "SS Label" : {
							min : 3,
							max : 560,
							palletOptions : [["Half/Demie",7],["Full/Complète",13]]
						},
						"PSL" : {
							min : 3,
							max : 70,
							palletOptions : [["Half/Demie",4],["Full/Complète",7]]
						},
                        "PSL Label" : {
							min : 3,
							max : 70,
							palletOptions : [["Half/Demie",4],["Full/Complète",7]]
						}
					}
				},
				"355ml Sleek" : {
					volume : 0.355,
					layerFactor : 506,
					labelType : {
						"Blank Cans" : {
							min : 10,
							max : 320,
							palletOptions : [["Half/Demie",8],["Full/Complète",16]]
						},
						"Printed" : {
							min : 10,
							max : 320,
							palletOptions : [["Half/Demie",8],["Full/Complète",16]]
						},	
						"Shrink Sleeve" : {
							min : 3,
							max : 640,
							palletOptions : [["Half/Demie",6],["Full/Complète",16]]
						},
                        "SS Label" : {
							min : 3,
							max : 640,
							palletOptions : [["Half/Demie",6],["Full/Complète",16]]
						},
						"PSL" : {
							min : 3,
							max : 70,
							palletOptions : [["Half/Demie",4],["Full/Complète",7]]
						},
                        "PSL Label" : {
							min : 3,
							max : 70,
							palletOptions : [["Half/Demie",4],["Full/Complète",7]]
						}
					}
				},
				"250ml Slim" : {
					volume : 0.250,
					layerFactor : 575,
					labelType : {
						"Blank Cans" : {
							min : 10,
							max : 340,
							palletOptions : [["Half/Demie",8],["Full/Complète",17]]
						},
						"Printed" : {
							min : 10,
							max : 340,
							palletOptions : [["Half/Demie",8],["Full/Complète",17]]
						},
						"Shrink Sleeve" : {
							min : 3,
							max : 680,
							palletOptions : [["Half/Demie",10],["Full/Complète",17]]
						},
                        "SS Label" : {
                           min : 3,
                           max : 680,
                           palletOptions : [["Half/Demie",10],["Full/Complète",17]]
                       },
						"PSL" : {
							min : 3,
							max : 100,
							palletOptions : [["Half/Demie",5],["Full/Complète",10]]
						},
                        "PSL Label" : {
                           min : 3,
                           max : 100,
                           palletOptions : [["Half/Demie",5],["Full/Complète",10]]
                       }
					}
				}
			},
			tray: {
				format : "Trays / Plateaux",
				units : 1,
				max : 5000,
				types : ["Standard", "Sleek", "Slim"]
			},
			end: {
				max : 624,
				types : ["200 B64 (250 ml Slim Cans Only)", "202 SuperEnd REC Epoxy", "202 LOE REC Epoxy", "202 LOE QC5 Epoxy", "202 LOE QC20 Epoxy", "202 LOE 10ST BPANI"]
			},
			paktechTypes: ["4pk Black (788/box)", "6pk Black (510/box)", "4pk White (788/box)", "6pk White (510/box)"]
		},
		mobileCanning:{
			labelTypes : ["Silver Bullet / Vierge", "PSL/EAC", "Shrink Sleeve / Manchon rétractable", "Printed/Imprimée", "Cust. Provided/Fourni par le client"],
			canFormats : ["355ml STD", "473ml STD", "355ml Sleek", "250ml Slim"],
			trayTypes : ["Standard", "Sleek", "Slim (250ml)"],
			paktechTypes: ["4pk Black (788/box)", "6pk Black (510/box)", "4pk White (788/box)", "6pk White (510/box)"]
		}
	}
}