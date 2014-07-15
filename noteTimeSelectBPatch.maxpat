{
	"patcher" : 	{
		"fileversion" : 1,
		"rect" : [ 34.0, 84.0, 752.0, 568.0 ],
		"bglocked" : 0,
		"defrect" : [ 34.0, 84.0, 752.0, 568.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 20.0, 20.0 ],
		"gridsnaponopen" : 0,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"boxes" : [ 			{
				"box" : 				{
					"maxclass" : "number",
					"id" : "obj-3",
					"outlettype" : [ "int", "bang" ],
					"fontname" : "Arial",
					"patching_rect" : [ 380.0, 160.0, 50.0, 20.0 ],
					"numinlets" : 1,
					"fontsize" : 12.0,
					"numoutlets" : 2
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "inlet",
					"id" : "obj-2",
					"outlettype" : [ "" ],
					"patching_rect" : [ 240.0, 60.0, 25.0, 25.0 ],
					"numinlets" : 0,
					"numoutlets" : 1,
					"comment" : ""
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "outlet",
					"id" : "obj-1",
					"patching_rect" : [ 100.0, 180.0, 25.0, 25.0 ],
					"numinlets" : 1,
					"numoutlets" : 0,
					"comment" : "time value text"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "umenu",
					"id" : "obj-34",
					"presentation_rect" : [ 0.0, 0.0, 56.0, 20.0 ],
					"outlettype" : [ "int", "", "" ],
					"fontname" : "Arial",
					"patching_rect" : [ 1.0, -13.0, 57.0, 20.0 ],
					"presentation" : 1,
					"items" : [ "1nd", ",", "1n", ",", "1nt", ",", "2nd", ",", "2n", ",", "2nt", ",", "4nd", ",", "4n", ",", "4nt", ",", "8nd", ",", "8n", ",", "8nt", ",", "16nd", ",", "16n", ",", "16nt", ",", "32nd", ",", "32n", ",", "32nt", ",", "64nd", ",", "64n", ",", "128n" ],
					"numinlets" : 1,
					"fontsize" : 12.0,
					"types" : [  ],
					"numoutlets" : 3
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-3", 0 ],
					"destination" : [ "obj-34", 0 ],
					"hidden" : 0,
					"midpoints" : [ 389.5, 183.0, 147.0, 183.0, 147.0, -9.0, 10.5, -9.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 0 ],
					"destination" : [ "obj-3", 0 ],
					"hidden" : 0,
					"midpoints" : [ 249.5, 128.0, 389.5, 128.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-34", 1 ],
					"destination" : [ "obj-1", 0 ],
					"hidden" : 0,
					"midpoints" : [ 29.5, 162.0, 109.5, 162.0 ]
				}

			}
 ]
	}

}
