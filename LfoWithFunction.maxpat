{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 6,
			"minor" : 0,
			"revision" : 8
		}
,
		"rect" : [ 811.0, 67.0, 1101.0, 889.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 20.0, 20.0 ],
		"gridsnaponopen" : 0,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-31",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 227.0, 139.0, 20.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 44.0, 3.0, 20.0, 20.0 ],
					"varname" : "toggle[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"int" : 1,
					"maxclass" : "gswitch",
					"numinlets" : 3,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 223.0, 211.0, 41.0, 32.0 ],
					"varname" : "gswitch"
				}

			}
, 			{
				"box" : 				{
					"annotation" : "raw input",
					"comment" : "raw input",
					"hint" : "raw input",
					"id" : "obj-29",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1075.0, 99.0, 25.0, 25.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 18.0,
					"id" : "obj-28",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 900.0, 700.0, 198.0, 27.0 ],
					"restore" : 					{
						"flonum" : [ 0.0 ],
						"gswitch" : [ 1 ],
						"number" : [ 0 ],
						"number[1]" : [ 0 ],
						"number[2]" : [ 0 ],
						"toggle" : [ 0 ],
						"toggle[1]" : [ 0 ]
					}
,
					"text" : "autopattr @autoname 1",
					"varname" : "u149010378"
				}

			}
, 			{
				"box" : 				{
					"comment" : "preset store",
					"id" : "obj-8",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1020.0, 100.0, 25.0, 25.0 ],
					"varname" : "inlet[6]"
				}

			}
, 			{
				"box" : 				{
					"comment" : "preset recall",
					"id" : "obj-2",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 880.0, 100.0, 25.0, 25.0 ],
					"varname" : "inlet[5]"
				}

			}
, 			{
				"box" : 				{
					"comment" : "bang when it loops around",
					"id" : "obj-5",
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 700.0, 860.0, 25.0, 25.0 ],
					"varname" : "outlet[2]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 320.0, 800.0, 33.0, 20.0 ],
					"text" : "float"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : 0.0,
					"id" : "obj-22",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 700.0, 100.0, 64.0, 20.0 ],
					"text" : "scale max",
					"varname" : "comment[4]"
				}

			}
, 			{
				"box" : 				{
					"comment" : "scale max",
					"hint" : "scale max",
					"id" : "obj-21",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 680.0, 100.0, 25.0, 25.0 ],
					"varname" : "inlet[4]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : 0.0,
					"id" : "obj-20",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 520.0, 100.0, 64.0, 20.0 ],
					"text" : "scale min",
					"varname" : "comment[3]"
				}

			}
, 			{
				"box" : 				{
					"comment" : "scale min",
					"hint" : "scale min",
					"id" : "obj-13",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 500.0, 100.0, 25.0, 25.0 ],
					"varname" : "inlet[3]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-34",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 680.0, 520.0, 32.5, 20.0 ],
					"text" : "int"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-27",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 640.0, 480.0, 20.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 220.0, 23.0, 20.0, 20.0 ],
					"varname" : "button[2]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 11.595187,
					"id" : "obj-32",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 660.0, 580.0, 110.0, 20.0 ],
					"text" : "sprintf %ld.%ld.%ld"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-18",
					"maxclass" : "number",
					"maximum" : 484,
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1000.0, 420.0, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 180.0, 23.0, 43.0, 20.0 ],
					"varname" : "number[2]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-17",
					"maxclass" : "number",
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 900.0, 420.0, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 140.0, 23.0, 40.0, 20.0 ],
					"varname" : "number[1]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-14",
					"maxclass" : "number",
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 840.0, 420.0, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 100.0, 23.0, 40.0, 20.0 ],
					"varname" : "number"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "bpatcher",
					"name" : "noteTimeSelectBPatch.maxpat",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 580.0, 340.0, 100.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 41.0, 23.0, 58.0, 21.0 ],
					"varname" : "jpatcher[1]"
				}

			}
, 			{
				"box" : 				{
					"comment" : "bang when it loops around",
					"id" : "obj-9",
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 480.0, 880.0, 25.0, 25.0 ],
					"varname" : "outlet[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 400.0, 140.0, 20.0, 20.0 ],
					"varname" : "button[1]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.847059, 0.890196, 0.027451, 1.0 ],
					"bordercolor" : [ 1.0, 0.0, 0.0, 1.0 ],
					"checkedcolor" : [ 1.0, 0.0, 0.898039, 1.0 ],
					"id" : "obj-25",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 20.0, 140.0, 20.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 5.0, 41.0, 41.0 ],
					"varname" : "toggle"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-24",
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 80.0, 880.0, 25.0, 25.0 ],
					"varname" : "outlet"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : 0.0,
					"id" : "obj-23",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 400.0, 100.0, 58.0, 20.0 ],
					"text" : "even line",
					"varname" : "comment[2]"
				}

			}
, 			{
				"box" : 				{
					"comment" : "even line",
					"id" : "obj-19",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 360.0, 100.0, 25.0, 25.0 ],
					"varname" : "inlet[2]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : 0.0,
					"id" : "obj-16",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 180.0, 100.0, 150.0, 20.0 ],
					"text" : "time message",
					"varname" : "comment[1]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : 0.0,
					"id" : "obj-15",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 60.0, 100.0, 66.0, 20.0 ],
					"text" : "start/Stop",
					"varname" : "comment"
				}

			}
, 			{
				"box" : 				{
					"comment" : "time message",
					"hint" : "time message",
					"id" : "obj-12",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 140.0, 100.0, 25.0, 25.0 ],
					"varname" : "inlet[1]"
				}

			}
, 			{
				"box" : 				{
					"annotation" : "startStop",
					"comment" : "startStop",
					"hint" : "startStop",
					"id" : "obj-10",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 40.0, 100.0, 19.0, 19.0 ],
					"varname" : "inlet"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-7",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 60.0, 720.0, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 3.0, 200.0, 66.0, 20.0 ],
					"varname" : "flonum"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"patching_rect" : [ 460.0, 480.0, 63.0, 20.0 ],
					"text" : "newLFO2",
					"varname" : "jpatcher"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 320.0, 480.0, 20.0, 20.0 ],
					"varname" : "button"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "bpatcher",
					"name" : "numberController.maxpat",
					"numinlets" : 6,
					"numoutlets" : 1,
					"offset" : [ 2.0, 4.0 ],
					"outlettype" : [ "" ],
					"patching_rect" : [ 60.0, 520.0, 242.0, 183.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 40.0, 349.0, 178.0 ],
					"varname" : "numberController"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 513.5, 772.0, 329.5, 772.0 ],
					"source" : [ "obj-1", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 2 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 469.5, 510.0, 387.0, 510.0, 374.0, 178.0, 254.5, 178.0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 513.5, 865.0, 489.5, 865.0 ],
					"source" : [ "obj-1", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 589.5, 452.0, 469.5, 452.0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 149.5, 418.0, 149.5, 456.0, 469.5, 456.0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 2 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 509.5, 418.0, 236.0, 428.0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 849.5, 508.0, 703.0, 508.0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 909.5, 543.0, 715.0, 543.0 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 2 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1009.5, 551.0, 760.5, 551.0 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 866.0, 352.0, 544.0, 402.0, 247.899994, 402.0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 3 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 678.0, 267.0, 447.0, 316.0, 396.0, 483.0 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 2 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 29.5, 453.0, 513.5, 453.0 ],
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 370.0, 164.0, 370.0, 385.0, 313.0, 392.0 ],
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 649.5, 509.0, 689.5, 509.0 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1084.5, 171.0, 243.5, 187.0 ],
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 329.5, 841.0, 709.5, 841.0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-30", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 669.5, 617.0, 569.0, 617.0, 569.0, 531.0, 569.0, 463.0, 469.5, 463.0 ],
					"source" : [ "obj-32", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 689.5, 566.0, 669.5, 566.0 ],
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 298.0, 503.0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 62.0, 849.0, 100.0, 857.0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 69.5, 762.0, 343.5, 769.0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 5 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 987.0, 312.0, 388.0, 454.0, 370.0, 506.0, 292.5, 506.0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "numberController.maxpat",
				"bootpath" : "\\Program Files (x86)\\Cycling '74\\Max 5.0\\patches\\myPatches",
				"patcherrelativepath" : "..\\myPatches",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "curve.function.js",
				"bootpath" : "\\Program Files (x86)\\Cycling '74\\Max 5.0\\Cycling '74\\jsui-library",
				"patcherrelativepath" : "..\\..\\Cycling '74\\jsui-library",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "newLFO2.maxpat",
				"bootpath" : "\\Program Files (x86)\\Cycling '74\\Max 5.0\\patches\\myTools",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "noteTimeSelectBPatch.maxpat",
				"bootpath" : "\\Program Files (x86)\\Cycling '74\\Max 5.0\\patches\\myTools",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
 ]
	}

}
