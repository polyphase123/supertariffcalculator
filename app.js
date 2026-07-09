document.addEventListener('DOMContentLoaded', () => {
    // --- DATA & CONFIGURATION ---
    const techData = {
        'Coal':         { color: '#4b5563', capex: 120000, opex: 2500, cf: 0.85, fuel_kwh: 2.5, isVRE: false, co2_factor: 950, is_imported: true, is_synchronous: true, is_renewable: false, name: 'Coal', jobs_construction_mw: 5.1, jobs_om_mw: 0.2, land_use_mw_ha: 0.5 },
        'NaturalGas':   { color: '#f59e0b', capex: 50000,  opex: 1500, cf: 0.70, fuel_kwh: 4.0, isVRE: false, co2_factor: 450, is_imported: true, is_synchronous: true, is_renewable: false, name: 'Natural Gas', jobs_construction_mw: 2.5, jobs_om_mw: 0.1, land_use_mw_ha: 0.3 },
        'LNG':          { color: '#d97706', capex: 55000,  opex: 1600, cf: 0.70, fuel_kwh: 4.2, isVRE: false, co2_factor: 450, is_imported: true, is_synchronous: true, is_renewable: false, name: 'LNG', jobs_construction_mw: 2.7, jobs_om_mw: 0.1, land_use_mw_ha: 0.4 },
        'Hydro':        { color: '#3b82f6', capex: 276675, opex: 2000, cf: 0.45, fuel_kwh: 0, isVRE: false, co2_factor: 0, is_imported: false, is_synchronous: true, is_renewable: true, name: 'Hydro', jobs_construction_mw: 4.0, jobs_om_mw: 0.15, land_use_mw_ha: 10.0 },
        'Geothermal':   { color: '#ef4444', capex: 172700, opex: 2800, cf: 0.90, fuel_kwh: 0, isVRE: false, co2_factor: 0, is_imported: false, is_synchronous: true, is_renewable: true, name: 'Geothermal', jobs_construction_mw: 8.0, jobs_om_mw: 0.3, land_use_mw_ha: 1.0 },
        'Solar':        { color: '#facc15', capex: 62000,  opex: 1000, cf: 0.20, fuel_kwh: 0, isVRE: true, co2_factor: 0, is_imported: false, is_synchronous: false, is_renewable: true, name: 'Solar', jobs_construction_mw: 9.5, jobs_om_mw: 0.1, land_use_mw_ha: 2.0 },
        'Wind':         { color: '#22c55e', capex: 180000, opex: 2000, cf: 0.35, fuel_kwh: 0, isVRE: true, co2_factor: 0, is_imported: false, is_synchronous: false, is_renewable: true, name: 'Onshore Wind', jobs_construction_mw: 7.0, jobs_om_mw: 0.3, land_use_mw_ha: 15.0 },
        'Biomass':      { color: '#84cc16', capex: 170000, opex: 4000, cf: 0.80, fuel_kwh: 2.0, isVRE: false, co2_factor: 0, is_imported: false, is_synchronous: true, is_renewable: true, name: 'Biomass', jobs_construction_mw: 8.5, jobs_om_mw: 1.2, land_use_mw_ha: 20.0 },
        'Oil-based':    { color: '#7e22ce', capex: 30000,  opex: 1000, cf: 0.30, fuel_kwh: 8.0, isVRE: false, co2_factor: 750, is_imported: true, is_synchronous: true, is_renewable: false, name: 'Diesel', jobs_construction_mw: 1.5, jobs_om_mw: 0.2, land_use_mw_ha: 0.2 },
        'Bunker':       { color: '#a16207', capex: 35000,  opex: 1200, cf: 0.50, fuel_kwh: 9.5, isVRE: false, co2_factor: 800, is_imported: true, is_synchronous: true, is_renewable: false, name: 'Bunker/HFO', jobs_construction_mw: 1.8, jobs_om_mw: 0.2, land_use_mw_ha: 0.2 },
        'OffshoreWind': { color: '#06b6d4', capex: 250000, opex: 3500, cf: 0.50, fuel_kwh: 0, isVRE: true, name: 'Offshore Wind', co2_factor: 0, is_imported: false, is_synchronous: false, is_renewable: true, jobs_construction_mw: 14.0, jobs_om_mw: 0.5, land_use_mw_ha: 0 },
        'Nuclear':      { color: '#a855f7', capex: 350000, opex: 4000, cf: 0.90, fuel_kwh: 0, isVRE: false, name: 'Nuclear', co2_factor: 0, is_imported: false, is_synchronous: true, is_renewable: false, jobs_construction_mw: 10.0, jobs_om_mw: 0.8, land_use_mw_ha: 0.4 },
        'Nuclear_SMR':  { color: '#a855f7', capex: 400000, opex: 4500, cf: 0.90, fuel_kwh: 0, isVRE: false, name: 'Nuclear (SMR)', co2_factor: 0, is_imported: false, is_synchronous: true, is_renewable: false, jobs_construction_mw: 12.0, jobs_om_mw: 1.0, land_use_mw_ha: 0.1 },
        'Nuclear_BNPP': { color: '#a855f7', capex: 220000, opex: 5000, cf: 0.90, fuel_kwh: 0, isVRE: false, name: 'Nuclear (BNPP)', co2_factor: 0, is_imported: false, is_synchronous: true, is_renewable: false, jobs_construction_mw: 10.0, jobs_om_mw: 0.8, land_use_mw_ha: 0.4 },
        'SolarBESS':    { color: '#eab308', capex: 95000, opex: 1500, cf: 0.20, fuel_kwh: 0, isVRE: true, name: 'Solar + BESS', co2_factor: 0, is_imported: false, is_synchronous: false, is_renewable: true, jobs_construction_mw: 10.0, jobs_om_mw: 0.15, land_use_mw_ha: 2.2 }
    };

    const specificModels = {
        'Coal': [
            { id: 'generic_coal_usc', name: 'Generic USC Coal Plant', capacity: 600 },
            { id: 'ge_usc_660', name: 'GE Steam Power USC 660MW', capacity: 660 },
            { id: 'siemens_usc_700', name: 'Siemens SST-6000 USC 700MW', capacity: 700 },
            { id: 'mhps_usc_650', name: 'MHPS USC Steam Turbine 650MW', capacity: 650 },
            { id: 'doosan_usc_800', name: 'Doosan Lentjes USC 800MW', capacity: 800 },
            { id: 'shanghai_elec_usc_1000', name: 'Shanghai Electric USC 1000MW', capacity: 1000 },
            { id: 'bhel_usc_660', name: 'BHEL USC 660MW', capacity: 660 },
            { id: 'generic_coal_sc', name: 'Generic SC Coal Plant', capacity: 300 },
            { id: 'ge_sc_350', name: 'GE Steam Power SC 350MW', capacity: 350 },
            { id: 'siemens_sc_300', name: 'Siemens SST-3000 SC 300MW', capacity: 300 },
            { id: 'mhps_sc_330', name: 'MHPS SC Steam Turbine 330MW', capacity: 330 },
            { id: 'doosan_sc_300', name: 'Doosan Lentjes SC 300MW', capacity: 300 },
            { id: 'harbin_sc_600', name: 'Harbin Electric SC 600MW', capacity: 600 },
            { id: 'dongfang_sc_350', name: 'Dongfang Electric SC 350MW', capacity: 350 },
            { id: 'generic_coal_cfb', name: 'Generic CFB Coal Plant', capacity: 150 },
            { id: 'sumitomo_cfb_150', name: 'Sumitomo SHI FW CFB 150MW', capacity: 150 }
        ],
        'NaturalGas': [
            { id: 'generic_ccgt', name: 'Generic CCGT H-Class', capacity: 600 },
            { id: 'ge_9ha_02_cc', name: 'GE 9HA.02 CCGT', capacity: 826 },
            { id: 'ge_7ha_03_cc', name: 'GE 7HA.03 CCGT', capacity: 640 },
            { id: 'siemens_sgt6_9000hl_cc', name: 'Siemens SGT6-9000HL CCGT', capacity: 870 },
            { id: 'siemens_sgt5_8000h_cc', name: 'Siemens SGT5-8000H CCGT', capacity: 665 },
            { id: 'mhps_m501jac_cc', name: 'MHPS M501JAC CCGT', capacity: 540 },
            { id: 'mhps_m701jac_cc', name: 'MHPS M701JAC CCGT', capacity: 710 },
            { id: 'ansaldo_gt36_cc', name: 'Ansaldo GT36 CCGT', capacity: 750 },
            { id: 'generic_ocgt', name: 'Generic OCGT F-Class', capacity: 200 },
            { id: 'ge_7f_04_oc', name: 'GE 7F.04 OCGT', capacity: 239 },
            { id: 'siemens_sgt6_5000f_oc', name: 'Siemens SGT6-5000F OCGT', capacity: 250 },
            { id: 'mhps_m501f_oc', name: 'MHPS M501F OCGT', capacity: 283 },
            { id: 'ge_lm6000', name: 'GE LM6000 Aeroderivative', capacity: 50 },
            { id: 'ge_lm2500', name: 'GE LM2500 Aeroderivative', capacity: 34 },
            { id: 'siemens_sgt_a35', name: 'Siemens SGT-A35 Aeroderivative', capacity: 38 },
            { id: 'rr_trent60', name: 'Rolls-Royce Trent 60 Aeroderivative', capacity: 66 }
        ],
        'LNG': [
            { id: 'generic_ccgt', name: 'Generic CCGT H-Class', capacity: 600 },
            { id: 'ge_9ha_02_cc', name: 'GE 9HA.02 CCGT', capacity: 826 },
            { id: 'ge_7ha_03_cc', name: 'GE 7HA.03 CCGT', capacity: 640 },
            { id: 'siemens_sgt6_9000hl_cc', name: 'Siemens SGT6-9000HL CCGT', capacity: 870 },
            { id: 'siemens_sgt5_8000h_cc', name: 'Siemens SGT5-8000H CCGT', capacity: 665 },
            { id: 'mhps_m501jac_cc', name: 'MHPS M501JAC CCGT', capacity: 540 },
            { id: 'mhps_m701jac_cc', name: 'MHPS M701JAC CCGT', capacity: 710 },
            { id: 'ansaldo_gt36_cc', name: 'Ansaldo GT36 CCGT', capacity: 750 },
            { id: 'generic_ocgt', name: 'Generic OCGT F-Class', capacity: 200 },
            { id: 'ge_7f_04_oc', name: 'GE 7F.04 OCGT', capacity: 239 },
            { id: 'siemens_sgt6_5000f_oc', name: 'Siemens SGT6-5000F OCGT', capacity: 250 },
            { id: 'mhps_m501f_oc', name: 'MHPS M501F OCGT', capacity: 283 },
            { id: 'ge_lm6000', name: 'GE LM6000 Aeroderivative', capacity: 50 },
            { id: 'ge_lm2500', name: 'GE LM2500 Aeroderivative', capacity: 34 },
            { id: 'siemens_sgt_a35', name: 'Siemens SGT-A35 Aeroderivative', capacity: 38 },
            { id: 'rr_trent60', name: 'Rolls-Royce Trent 60 Aeroderivative', capacity: 66 }
        ],
        'Oil-based': [
            { id: 'generic_diesel', name: 'Generic Diesel Engine Plant', capacity: 20 },
            { id: 'wartsila_50df', name: 'Wärtsilä 50DF', capacity: 18.5 },
            { id: 'wartsila_34df', name: 'Wärtsilä 34DF', capacity: 9.7 },
            { id: 'man_18v51_60df', name: 'MAN 18V51/60DF', capacity: 20.7 },
            { id: 'man_12v51_60df', name: 'MAN 12V51/60DF', capacity: 13.8 },
            { id: 'cat_c175_20', name: 'CAT C175-20', capacity: 4.0 },
            { id: 'cat_3616', name: 'CAT 3616', capacity: 6.0 },
            { id: 'cummins_qsk95', name: 'Cummins QSK95', capacity: 3.5 },
            { id: 'cummins_qsk60', name: 'Cummins QSK60', capacity: 2.2 },
            { id: 'mtu_20v4000', name: 'MTU 20V4000', capacity: 3.3 }
        ],
        'Bunker': [
            { id: 'generic_hfo', name: 'Generic HFO Engine Plant', capacity: 50 },
            { id: 'wartsila_46f', name: 'Wärtsilä 46F', capacity: 20.7 },
            { id: 'wartsila_32', name: 'Wärtsilä 32', capacity: 9.6 },
            { id: 'man_18v48_60ts', name: 'MAN 18V48/60TS', capacity: 21.6 }
        ],
        'Solar': [ { id: 'generic', name: 'Generic Utility-Scale', capacity: 100 } ],
        'Wind': [ { id: 'generic', name: 'Generic Onshore Wind', capacity: 100 } ],
        'OffshoreWind': [ { id: 'generic', name: 'Generic Offshore Wind', capacity: 200 } ],
        'Geothermal': [ { id: 'generic', name: 'Generic Geothermal', capacity: 50 } ],
        'Biomass': [ { id: 'generic', name: 'Generic Biomass', capacity: 20 } ],
        'Hydro': [ { id: 'generic', name: 'Generic Hydro', capacity: 50 } ],
        'SolarBESS': [ { id: 'generic', name: 'Generic Solar + BESS', capacity: 50 } ],
        'Nuclear': [
            { id: 'smr_generic', name: 'Small Modular Reactor (SMR) - Generic', capacity: 150, type: 'Nuclear_SMR' },
            { id: 'smr_bwrox300', name: 'SMR - BWRX-300', capacity: 300, type: 'Nuclear_SMR' },
            { id: 'large_generic', name: 'Large Conventional - Generic', capacity: 1200, type: 'Nuclear' }
        ]
    };

    const baselineGrids = {
        as_of_april_2025: {
            national: [ { tech: 'Coal', capacity: 13006 }, { tech: 'Oil-based', capacity: 3404 }, { tech: 'NaturalGas', capacity: 4612 }, { tech: 'Biomass', capacity: 779 }, { tech: 'Geothermal', capacity: 1987 }, { tech: 'Solar', capacity: 3126 }, { tech: 'Hydro', capacity: 3844 }, { tech: 'Wind', capacity: 427 } ],
            luzon: [ { tech: 'Coal', capacity: 9392 }, { tech: 'Oil-based', capacity: 2054 }, { tech: 'NaturalGas', capacity: 4611 }, { tech: 'Biomass', capacity: 215 }, { tech: 'Geothermal', capacity: 900 }, { tech: 'Solar', capacity: 2503 }, { tech: 'Hydro', capacity: 2565 }, { tech: 'Wind', capacity: 337 } ],
            visayas: [ { tech: 'Coal', capacity: 1346 }, { tech: 'Oil-based', capacity: 517 }, { tech: 'NaturalGas', capacity: 1 }, { tech: 'Biomass', capacity: 442 }, { tech: 'Geothermal', capacity: 975 }, { tech: 'Solar', capacity: 535 }, { tech: 'Hydro', capacity: 55 }, { tech: 'Wind', capacity: 90 } ],
            mindanao: [ { tech: 'Coal', capacity: 2268 }, { tech: 'Oil-based', capacity: 833 }, { tech: 'NaturalGas', capacity: 0 }, { tech: 'Biomass', capacity: 122 }, { tech: 'Geothermal', capacity: 112 }, { tech: 'Solar', capacity: 88 }, { tech: 'Hydro', capacity: 1224 }, { tech: 'Wind', capacity: 0 } ]
        },
        projected_2024: {
            national: [ { tech: 'Coal', capacity: 12406 }, { tech: 'NaturalGas', capacity: 3453 }, { tech: 'Hydro', capacity: 3830 }, { tech: 'Geothermal', capacity: 1957 }, { tech: 'Solar', capacity: 1663 },  { tech: 'Wind', capacity: 427 }, { tech: 'Biomass', capacity: 484 }, { tech: 'Oil-based', capacity: 2448 } ],
            luzon: [ { tech: 'Coal', capacity: 10400 }, { tech: 'NaturalGas', capacity: 3453 }, { tech: 'Hydro', capacity: 2600 }, { tech: 'Geothermal', capacity: 1250 }, { tech: 'Solar', capacity: 1200 },  { tech: 'Wind', capacity: 400 }, { tech: 'Biomass', capacity: 300 }, { tech: 'Oil-based', capacity: 1800 } ],
            visayas: [ { tech: 'Coal', capacity: 1000 }, { tech: 'Hydro', capacity: 550 }, { tech: 'Geothermal', capacity: 600 }, { tech: 'Solar', capacity: 400 }, { tech: 'Wind', capacity: 27 }, { tech: 'Biomass', capacity: 100 }, { tech: 'Oil-based', capacity: 428 } ],
            mindanao: [ { tech: 'Coal', capacity: 1006 }, { tech: 'Hydro', capacity: 680 }, { tech: 'Geothermal', capacity: 107 }, { tech: 'Solar', capacity: 63 }, { tech: 'Biomass', capacity: 84 }, { tech: 'Oil-based', capacity: 220 } ]
        },
        baseline_2022: {
            national: [ { tech: 'Coal', capacity: 12000 }, { tech: 'NaturalGas', capacity: 3500 }, { tech: 'Hydro', capacity: 3750 }, { tech: 'Geothermal', capacity: 1930 }, { tech: 'Solar', capacity: 950 },  { tech: 'Wind', capacity: 420 }, { tech: 'Biomass', capacity: 230 }, { tech: 'Oil-based', capacity: 2500 } ],
            luzon: [ { tech: 'Coal', capacity: 9500 }, { tech: 'NaturalGas', capacity: 3500 }, { tech: 'Hydro', capacity: 2500 }, { tech: 'Geothermal', capacity: 1200 }, { tech: 'Solar', capacity: 700 },  { tech: 'Wind', capacity: 380 }, { tech: 'Biomass', capacity: 150 }, { tech: 'Oil-based', capacity: 1800 } ],
            visayas: [ { tech: 'Coal', capacity: 1500 }, { tech: 'Hydro', capacity: 500 }, { tech: 'Geothermal', capacity: 600 }, { tech: 'Solar', capacity: 200 }, { tech: 'Wind', capacity: 40 }, { tech: 'Biomass', capacity: 50 }, { tech: 'Oil-based', capacity: 400 } ],
            mindanao: [ { tech: 'Coal', capacity: 1000 }, { tech: 'Hydro', capacity: 750 }, { tech: 'Geothermal', capacity: 130 }, { tech: 'Solar', capacity: 50 }, { tech: 'Biomass', capacity: 30 }, { tech: 'Oil-based', capacity: 300 } ]
        }
    };

    const preDefinedScenarios = {
        'custom': [],
        'committed_projects': [ { tech: 'Coal', capacity: 2305 }, { tech: 'NaturalGas', capacity: 6070 }, { tech: 'Oil-based', capacity: 87 }, { tech: 'Geothermal', capacity: 122 }, { tech: 'Hydro', capacity: 271 }, { tech: 'Solar', capacity: 3391 }, { tech: 'Wind', capacity: 273 }, { tech: 'Biomass', capacity: 81 } ],
        'gea1_to_3_awarded': [ { tech: 'Solar', capacity: 2268.752 }, { tech: 'Wind', capacity: 1836.384 }, { tech: 'Hydro', capacity: 6749.15 }, { tech: 'Biomass', capacity: 3.4 }, { tech: 'Geothermal', capacity: 30.887 } ],
        'gea4_to_5_target': [ { tech: 'Solar', capacity: 6487.902 }, { tech: 'Wind', capacity: 2518.29 }, { tech: 'SolarBESS', capacity: 1189.29 }, { tech: 'OffshoreWind', capacity: 3300 } ],
        'gea1_to_5_total': [ { tech: 'Solar', capacity: 8756.654 }, { tech: 'Wind', capacity: 4354.674 }, { tech: 'Hydro', capacity: 6749.15 }, { tech: 'Biomass', capacity: 3.4 }, { tech: 'Geothermal', capacity: 30.887 }, { tech: 'SolarBESS', capacity: 1189.29 }, { tech: 'OffshoreWind', capacity: 3300 } ],
        'gea1_to_5_50_percent': [ { tech: 'Solar', capacity: 4378.327 }, { tech: 'Wind', capacity: 2177.337 }, { tech: 'Hydro', capacity: 3374.575 }, { tech: 'Biomass', capacity: 1.7 }, { tech: 'Geothermal', capacity: 15.444 }, { tech: 'SolarBESS', capacity: 594.645 }, { tech: 'OffshoreWind', capacity: 1650 } ],
        'pep_ref': [ { tech: 'Solar', capacity: 54948 }, { tech: 'Wind', capacity: 31842 }, { tech: 'Hydro', capacity: 10266 }, { tech: 'Geothermal', capacity: 1355 }, { tech: 'NaturalGas', capacity: 21881 }, { tech: 'Coal', capacity: 2305 } ],
        'pep_ces1': [ { tech: 'Solar', capacity: 53164 }, { tech: 'Wind', capacity: 13842 }, { tech: 'OffshoreWind', capacity: 19500 }, { tech: 'Hydro', capacity: 6800 }, { tech: 'Geothermal', capacity: 1005 }, { tech: 'Nuclear', capacity: 4800 }, { tech: 'NaturalGas', capacity: 15989 } ],
        'pep_ces2': [ { tech: 'Solar', capacity: 34164 }, { tech: 'Wind', capacity: 15408 }, { tech: 'OffshoreWind', capacity: 50100 }, { tech: 'Hydro', capacity: 6181 }, { tech: 'Geothermal', capacity: 1005 }, { tech: 'Nuclear', capacity: 4800 }, { tech: 'NaturalGas', capacity: 18857 } ],
        'nuclear_bnpp': [ { tech: 'Nuclear_BNPP', capacity: 621 } ],
        'nuclear_2032': [ { tech: 'Nuclear', capacity: 1200 } ],
        'nuclear_2050': [ { tech: 'Nuclear', capacity: 4800 } ]
    };

    const fitData = [
        { tech: 'SOLAR', fit: 'FIT I', rate: 9.68, target: 50, subscribed: 67.6, plants: 6 },
        { tech: 'SOLAR', fit: 'FIT II', rate: 8.69, target: 450, subscribed: 476.032, plants: 18 },
        { tech: 'WIND', fit: 'FIT I', rate: 8.53, target: 200, subscribed: 234.54, plants: 3 },
        { tech: 'WIND', fit: 'FIT II', rate: 7.40, target: 200, subscribed: 141.0, plants: 3 },
        { tech: 'BIOMASS', fit: 'FIT I', rate: 6.63, target: 250, subscribed: 117.351, plants: 12 },
        { tech: 'BIOMASS', fit: 'Degressed', rate: 6.5969, target: null, subscribed: 18.064, plants: 5 },
        { tech: 'BIOMASS', fit: 'FIT II', rate: 6.19, target: null, subscribed: 104.03, plants: 10 },
        { tech: 'ROR HYDRO', fit: 'FIT I', rate: 5.90, target: 250, subscribed: 35.956, plants: 5 },
        { tech: 'ROR HYDRO', fit: 'Degressed', rate: 5.8705, target: null, subscribed: 8.5, plants: 1 },
        { tech: 'ROR HYDRO', fit: 'FIT II', rate: 5.8705, target: null, subscribed: 102.901, plants: 8 },
        { tech: 'ROR HYDRO', fit: 'Special FIT', rate: 5.6715, target: null, subscribed: 74.8, plants: 1 },
        { tech: 'ROR HYDRO', fit: 'FIT III', rate: 6.111, target: null, subscribed: 3.756, plants: 2 },
        { tech: 'ROR HYDRO', fit: 'FIT III - deg.', rate: 6.0804, target: null, subscribed: 21.67, plants: 5 },
        { tech: 'ROR HYDRO', fit: 'FIT III - deg.', rate: 6.0500, target: null, subscribed: 8.395, plants: 2 },
        { tech: 'ROR HYDRO', fit: 'FIT III - deg.', rate: 6.0198, target: null, subscribed: 59.82, plants: 6 },
        { tech: 'ROR HYDRO', fit: 'FIT III - deg.', rate: 5.9897, target: null, subscribed: 15.88, plants: 2 },
        { tech: 'ROR HYDRO', fit: 'FIT IV', rate: 6.9282, target: 100, subscribed: 0, plants: 0 }
    ];

    const fitAllData = [
        { year: '2015', rate: 0.0406, notes: 'Initial FIT-All rate implementation.' },
        { year: '2016', rate: 0.1830, notes: 'Substantial increase to support growing RE projects.' },
        { year: '2017', rate: 0.2563, notes: 'Upward trend continued to cover program costs.' },
        { year: '2018', rate: 0.2563, notes: 'Rate adjusted back to 2017 level.' },
        { year: '2019', rate: 0.0495, notes: 'Significant reduction implemented.' },
        { year: '2020', rate: 0.0983, notes: 'Rate doubled to ensure fund sustainability.' },
        { year: '2021', rate: 0.0364, notes: 'Notable decrease approved.' },
        { year: '2022-2023', rate: null, notes: 'Collection suspended by ERC to alleviate consumer burden.' },
        { year: 'Feb 2024', rate: 0.0364, notes: 'Collection resumed at the 2021 rate.' },
        { year: 'Mid-2024', rate: 0.0838, notes: 'Rate adjusted upwards due to low WESM prices.' },
        { year: 'Mar 2025', rate: 0.1189, notes: 'Further increase to ensure FIT program viability.' }
    ];

    const spugClusters = {
        batanes: { name: "Batanes", sagr_cap: 7.39, budget: 900, diesel_kw: 2800, annual_demand_gwh: 2.88 },
        bicol: { name: "Bicol SPUG", sagr_cap: 6.55, budget: 820, diesel_kw: 3500, annual_demand_gwh: 4.10 },
        palawan: { name: "El Nido, Palawan", sagr_cap: 7.39, budget: 960, diesel_kw: 4200, annual_demand_gwh: 5.50 },
        tawi_tawi: { name: "Tawi-Tawi", sagr_cap: 6.71, budget: 740, diesel_kw: 3000, annual_demand_gwh: 3.95 }
    };

    let scenarioAdditions = [];
    let pinnedScenarios = [];
    let charts = {};
    let currentBaseline = baselineGrids.as_of_april_2025.national;

    // --- DOM REFERENCES ---
    const dom = {
        baselineSelect: document.getElementById('baselineSelect'),
        gridSelect: document.getElementById('gridSelect'),
        scenarioSelect: document.getElementById('scenarioSelect'),
        plantType: document.getElementById('plantType'),
        specificModel: document.getElementById('specificModel'),
        unitCount: document.getElementById('unitCount'),
        unitCountWrapper: document.getElementById('unitCountWrapper'),
        capacity: document.getElementById('capacity'),
        capacityHelper: document.getElementById('capacityHelper'),
        addPlantBtn: document.getElementById('addPlantBtn'),
        scenarioList: document.getElementById('scenarioList'),
        
        demandScenario: document.getElementById('demandScenario'),
        reCostReduction: document.getElementById('reCostReduction'),
        gridUpgrade: document.getElementById('gridUpgrade'),
        gridReinforcementCost: document.getElementById('gridReinforcementCost'),
        vreCurtailmentRisk: document.getElementById('vreCurtailmentRisk'),
        vreAncillaryCost: document.getElementById('vreAncillaryCost'),
        overrideWesm: document.getElementById('overrideWesm'),
        manualWesmRate: document.getElementById('manualWesmRate'),
        manualWesmVal: document.getElementById('manualWesmVal'),
        wesmOverrideWrapper: document.getElementById('wesmOverrideWrapper'),
        
        pinScenarioBtn: document.getElementById('pinScenarioBtn'),
        resetBtn: document.getElementById('resetBtn'),

        // Outputs
        totalSystemCost: document.getElementById('totalSystemCost'),
        tariffImpact: document.getElementById('tariffImpact'),
        reShare: document.getElementById('reShare'),
        additionsLcoe: document.getElementById('additionsLcoe'),
        marginalRate: document.getElementById('marginalRate'),
        importCost: document.getElementById('importCost'),
        systemInertia: document.getElementById('systemInertia'),
        jobsCreated: document.getElementById('jobsCreated'),
        landUse: document.getElementById('landUse'),
        resiliencyScore: document.getElementById('resiliencyScore'),
        totalEmissions: document.getElementById('totalEmissions'),

        // Tab Nav
        tabButtons: document.querySelectorAll('.tab-btn'),
        tabPanes: document.querySelectorAll('.tab-pane'),

        // Modal
        reportModal: document.getElementById('reportModal'),
        reportText: document.getElementById('reportText'),
        closeModalBtn: document.getElementById('closeModalBtn'),
        copyReportBtn: document.getElementById('copyReportBtn')
    };

    // --- UTILITIES ---
    const formatNumber = (num, decimals = 0) => num === null ? 'N/A' : new Intl.NumberFormat('en-US', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(num);
    const formatCurrency = (num, notation = 'standard', decimals = 2) => `₱${new Intl.NumberFormat('en-US', { maximumFractionDigits: decimals, minimumFractionDigits: decimals, notation: notation }).format(num)}`;
    const formatTons = (num) => `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0, notation: 'compact' }).format(num)} tCO₂`;

    // --- CORE DISPATCH CALCULATOR ---
    function calculateSystemMetrics(system, isBaseline = false, sensitivity = {}, contingency = {}) {
        const lifetime = 25;
        const discountRate = 0.093; // 9.3% WACC
        const crf = discountRate * Math.pow(1 + discountRate, lifetime) / (Math.pow(1 + discountRate, lifetime) - 1);
        
        const demandGrowth = isBaseline ? 0 : (parseFloat(dom.demandScenario.value) || 0) / 100;
        const baseAncillaryCost = 0.30;
        const vreAncillaryCostFactor = parseFloat(dom.vreAncillaryCost.value) || 0;
        let gridReinforcementCost = contingency.gridReinforcementCost || parseFloat(dom.gridReinforcementCost.value) || 0;
        const vreCurtailmentRisk = (contingency.vreCurtailmentRisk || parseFloat(dom.vreCurtailmentRisk.value) || 0) / 100;
        
        // 1. Calculate Grid Demand Load (fixed target based on baseline capability + growth)
        // Baseline total capacity defines baseline potential generation.
        let baselineGenGWh = 0;
        currentBaseline.forEach(plant => {
            const tech = techData[plant.tech];
            baselineGenGWh += (plant.capacity * tech.cf * 8760 / 1000);
        });
        const targetDemandKWh = baselineGenGWh * 1e6 * (1 + demandGrowth);

        // 2. Merit Order Dispatch Simulation:
        // Sort plants by marginal fuel cost (variable dispatch cost)
        const plantsToDispatch = system.map(plant => {
            const isNewlyAdded = !currentBaseline.some(basePlant => basePlant.tech === plant.tech && basePlant.capacity === plant.capacity);
            const tech = techData[plant.tech];
            
            let capex = tech.capex * (1 + (sensitivity.capex || 0) / 100);
            if (isNewlyAdded && (plant.tech.includes('Solar') || plant.tech.includes('Wind'))) {
                const reductionRate = (parseFloat(dom.reCostReduction.value) || 0) / 100;
                capex *= Math.pow(1 - reductionRate, 10);
            }

            let fuelCostKwh = tech.fuel_kwh * (1 + (sensitivity.fuel || 0) / 100);
            let cf = tech.isVRE ? tech.cf * (1 + (sensitivity.cf || 0) / 100) : tech.cf;

            const capacityKW = plant.capacity * 1000;
            const annualizedCapex = capacityKW * capex * crf;
            const annualOpex = capacityKW * tech.opex;
            
            // Maximum potential annual generation in kWh
            let maxGenKWh = plant.capacity * 1000 * cf * 8760;
            if (tech.isVRE) {
                maxGenKWh *= (1 - vreCurtailmentRisk);
            }

            return {
                techName: tech.name || plant.tech,
                techKey: plant.tech,
                capacity: plant.capacity,
                capacityKW,
                annualizedCapex,
                annualOpex,
                fuelCostKwh,
                maxGenKWh,
                isVRE: tech.isVRE,
                isNewlyAdded,
                is_imported: tech.is_imported,
                is_synchronous: tech.is_synchronous,
                is_renewable: tech.is_renewable,
                co2_factor: tech.co2_factor || 0,
                color: tech.color,
                marginalCost: fuelCostKwh + (tech.opex / (8760 * cf))
            };
        });

        // Sort: low marginal fuel cost first (Renewables go first because they have fuelCostKwh = 0)
        plantsToDispatch.sort((a, b) => a.fuelCostKwh - b.fuelCostKwh);

        let remainingDemandKWh = targetDemandKWh;
        let totalAnnualGenCost = 0;
        let totalDispatchedGenKWh = 0;
        let totalDispatchedVREKWh = 0;
        let totalDispatchedREKWh = 0;
        let totalImportedFuelCost = 0;
        let totalEmissions = 0;
        let totalCapacity = 0;
        let totalSynchronousCapacity = 0;
        let marginalSpotRate = 0;
        let totalAdditionsCost = 0;
        let totalAdditionsGenKWh = 0;

        const detailedResults = plantsToDispatch.map(plant => {
            // Dispatch plant up to its max generation capability or remaining load
            const dispatchedGenKWh = Math.min(plant.maxGenKWh, remainingDemandKWh);
            remainingDemandKWh -= dispatchedGenKWh;

            if (dispatchedGenKWh > 0) {
                marginalSpotRate = plant.fuelCostKwh;
            }

            const annualFuelCost = dispatchedGenKWh * plant.fuelCostKwh;
            const totalCost = plant.annualizedCapex + plant.annualOpex + annualFuelCost;

            if (plant.isNewlyAdded) {
                totalAdditionsCost += totalCost;
                totalAdditionsGenKWh += dispatchedGenKWh;
            }

            totalAnnualGenCost += totalCost;
            totalDispatchedGenKWh += dispatchedGenKWh;
            if (plant.isVRE) totalDispatchedVREKWh += dispatchedGenKWh;
            if (plant.is_renewable) totalDispatchedREKWh += dispatchedGenKWh;
            if (plant.is_imported) totalImportedFuelCost += annualFuelCost;
            totalEmissions += (dispatchedGenKWh / 1e6) * plant.co2_factor;
            totalCapacity += plant.capacity;
            if (plant.is_synchronous) totalSynchronousCapacity += plant.capacity;

            return {
                techName: plant.techName,
                capacity: plant.capacity,
                annualGenerationGWh: dispatchedGenKWh / 1e6,
                color: plant.color,
                emissions: (dispatchedGenKWh / 1e6) * plant.co2_factor,
                marginalCost: plant.marginalCost
            };
        });

        // Grid upgrade reinforcement penalties
        if (dom.gridUpgrade.value === 'current' && scenarioAdditions.length > 0) {
            const lastAdded = scenarioAdditions[scenarioAdditions.length - 1];
            const gridCapacity = currentBaseline.reduce((sum, p) => sum + p.capacity, 0);
            const largePlantThreshold = gridCapacity * 0.1;
            if (lastAdded.capacity > largePlantThreshold) {
                gridReinforcementCost += 0.15;
            }
        }

        // Apply manual override to scenario spot rate
        if (!isBaseline && dom.overrideWesm && dom.overrideWesm.checked) {
            marginalSpotRate = parseFloat(dom.manualWesmRate.value) || 0;
        }
        
        // Correct unit scaling: totalAnnualGenCost in PHP, totalDispatchedGenKWh in kWh
        const blendedGenerationCost = totalDispatchedGenKWh > 0 ? totalAnnualGenCost / totalDispatchedGenKWh : 0;
        
        const vreShare = totalDispatchedGenKWh > 0 ? totalDispatchedVREKWh / totalDispatchedGenKWh : 0;
        const ancillaryCost = baseAncillaryCost + (vreShare * 100 * vreAncillaryCostFactor);
        
        const totalSystemCostPerKwh = blendedGenerationCost + ancillaryCost + gridReinforcementCost;
        const systemInertia = totalCapacity > 0 ? (totalSynchronousCapacity / totalCapacity) * 100 : 0;
        const reShare = totalDispatchedGenKWh > 0 ? (totalDispatchedREKWh / totalDispatchedGenKWh) * 100 : 0;

        // Job & Land updates
        let totalJobs = 0;
        let totalLandUse = 0;
        scenarioAdditions.forEach(plant => {
            const tech = techData[plant.tech];
            if (tech) {
                totalJobs += (plant.capacity * tech.jobs_construction_mw) + (plant.capacity * tech.jobs_om_mw);
                totalLandUse += (plant.capacity * tech.land_use_mw_ha);
            }
        });

        const diversityScore = (() => {
            const proportions = {};
            detailedResults.forEach(d => {
                proportions[d.techName] = (proportions[d.techName] || 0) + d.annualGenerationGWh;
            });
            let shannonIndex = 0;
            Object.values(proportions).forEach(gwh => {
                if (gwh > 0 && totalDispatchedGenKWh > 0) {
                    const p = gwh / (totalDispatchedGenKWh / 1e6);
                    shannonIndex -= p * Math.log(p);
                }
            });
            return Math.min(shannonIndex / 2.3, 1);
        })();

        const selfSufficiency = totalDispatchedGenKWh > 0 ? ((totalDispatchedGenKWh - totalImportedFuelCost/10) / totalDispatchedGenKWh) * 100 : 0;
        const resiliencyScore = Math.min((diversityScore * 3) + ((selfSufficiency / 100) * 4) + ((systemInertia / 100) * 3), 10);
        
        const additionsLcoe = totalAdditionsGenKWh > 0 ? totalAdditionsCost / totalAdditionsGenKWh : 0;

        return { 
            totalSystemCostPerKwh, 
            totalAnnualSystemCost: totalSystemCostPerKwh * totalDispatchedGenKWh, 
            details: detailedResults, 
            totalCapacity, 
            blendedGenerationCost, 
            marginalSpotRate,
            additionsLcoe,
            ancillaryCost, 
            gridReinforcementCost, 
            totalAnnualGeneration: totalDispatchedGenKWh / 1e6, 
            totalEmissions, 
            totalImportedFuelCost, 
            systemInertia, 
            reShare,
            totalJobs, 
            totalLandUse, 
            resiliencyScore
        };
    }

    // --- UI UPDATER ---
    function updateUI() {
        const baselineData = baselineGrids[dom.baselineSelect.value];
        currentBaseline = baselineData[dom.gridSelect.value];

        const baselineMetrics = calculateSystemMetrics(currentBaseline, true);
        const scenarioSystem = [...currentBaseline, ...scenarioAdditions];
        let scenarioMetrics = calculateSystemMetrics(scenarioSystem);
        
        dom.totalSystemCost.textContent = `${formatCurrency(scenarioMetrics.totalSystemCostPerKwh)}/kWh`;
        dom.marginalRate.textContent = `${formatCurrency(scenarioMetrics.marginalSpotRate)}/kWh`;
        dom.additionsLcoe.textContent = `${formatCurrency(scenarioMetrics.additionsLcoe)}/kWh`;
        dom.totalEmissions.textContent = formatTons(scenarioMetrics.totalEmissions);
        dom.importCost.textContent = formatCurrency(scenarioMetrics.totalImportedFuelCost, 'compact');
        dom.systemInertia.textContent = `${scenarioMetrics.systemInertia.toFixed(1)}%`;
        dom.reShare.textContent = `${scenarioMetrics.reShare.toFixed(1)}%`;
        
        const tariffImpactValue = ((scenarioMetrics.totalSystemCostPerKwh / baselineMetrics.totalSystemCostPerKwh) - 1) * 100;
        const diffPhpKwh = scenarioMetrics.totalSystemCostPerKwh - baselineMetrics.totalSystemCostPerKwh;
        const diffText = diffPhpKwh >= 0 ? `+₱${diffPhpKwh.toFixed(2)}/kWh` : `-₱${Math.abs(diffPhpKwh).toFixed(2)}/kWh`;
        dom.tariffImpact.textContent = `${tariffImpactValue >= 0 ? '+' : ''}${tariffImpactValue.toFixed(2)}% (${diffText})`;
        dom.tariffImpact.className = 'metric-value ';
        if (tariffImpactValue > 0.1) {
            dom.tariffImpact.style.color = '#dc2626'; // Vivid Red
        } else if (tariffImpactValue < -0.1) {
            dom.tariffImpact.style.color = '#059669'; // Vivid Green
        } else {
            dom.tariffImpact.style.color = 'var(--text-secondary)';
        }

        dom.jobsCreated.textContent = formatNumber(scenarioMetrics.totalJobs, 0);
        dom.landUse.textContent = `${formatNumber(scenarioMetrics.totalLandUse, 0)} ha`;
        dom.resiliencyScore.textContent = `${scenarioMetrics.resiliencyScore.toFixed(1)} / 10`;

        updateCharts(scenarioMetrics);
        renderActiveTab(baselineMetrics, scenarioMetrics);
        renderScenarioAdditionsList();
    }

    function renderScenarioAdditionsList() {
        dom.scenarioList.innerHTML = '';
        scenarioAdditions.forEach((plant, idx) => {
            const item = document.createElement('div');
            item.className = 'addition-item';
            item.innerHTML = `
                <span>${techData[plant.tech].name}: <strong>${plant.capacity} MW</strong></span>
                <button class="remove-btn" data-index="${idx}">×</button>
            `;
            dom.scenarioList.appendChild(item);
        });

        dom.scenarioList.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.index);
                scenarioAdditions.splice(idx, 1);
                dom.scenarioSelect.value = 'custom';
                updateUI();
            });
        });
    }

    // --- CHARTS SETUP ---
    function initCharts() {
        const chartOptions = { 
            responsive: true, 
            maintainAspectRatio: false, 
            plugins: { 
                legend: { position: 'bottom', labels: { color: '#475569', boxWidth: 12 } }
            } 
        };

        charts.mixChart = new Chart(document.getElementById('mixChart'), {
            type: 'doughnut',
            data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
            options: chartOptions
        });

        charts.emissionsChart = new Chart(document.getElementById('emissionsChart'), {
            type: 'doughnut',
            data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
            options: chartOptions
        });
    }

    function updateCharts(scenarioMetrics) {
        if (!charts.mixChart || !charts.emissionsChart) return;

        charts.mixChart.data.labels = scenarioMetrics.details.map(d => d.techName);
        charts.mixChart.data.datasets[0].data = scenarioMetrics.details.map(d => d.capacity);
        charts.mixChart.data.datasets[0].backgroundColor = scenarioMetrics.details.map(d => d.color);
        charts.mixChart.update();

        const emitting = scenarioMetrics.details.filter(d => d.emissions > 0);
        charts.emissionsChart.data.labels = emitting.map(d => d.techName);
        charts.emissionsChart.data.datasets[0].data = emitting.map(d => d.emissions);
        charts.emissionsChart.data.datasets[0].backgroundColor = emitting.map(d => d.color);
        charts.emissionsChart.update();
    }

    // --- TAB ROUTER (FAST DYNAMIC LOADING) ---
    function renderActiveTab(baselineMetrics, scenarioMetrics) {
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
        
        switch (activeTab) {
            case 'spug':
                renderSpugTab();
                break;
            case 'dispatch':
                renderDispatchTab(scenarioMetrics);
                break;
            case 'stability':
                renderStabilityTab(scenarioMetrics);
                break;
            case 'compare':
                renderCompareTab();
                break;
            case 'finance':
                renderFinanceTab();
                break;
            case 'fit':
                renderFitTab();
                break;
            case 'gea':
                renderGeaTab();
                break;
            case 'socio':
                renderSocioTab(baselineMetrics, scenarioMetrics);
                break;
            case 'sensitivity':
                renderSensitivityTab(baselineMetrics, scenarioMetrics);
                break;
        }
    }

    // --- SPUG HYBRIDIZATION SIMULATOR ---
    function renderSpugTab() {
        const pane = document.getElementById('spug');
        if (pane.dataset.rendered === 'true') {
            updateSpug();
            return;
        }
        pane.dataset.rendered = 'true';

        pane.innerHTML = `
            <div class="info-block">
                <h4>NAPOCOR SPUG Hybridization Program</h4>
                <p>The Accelerated Hybridization Program (AHP) incorporates Solar PV + Battery Storage (BESS) into isolated island microgrids currently relying on expensive diesel fuel, lowering UCME subsidy burdens.</p>
            </div>
            <div class="charts-grid" style="margin-bottom: 2rem;">
                <div class="form-group card" style="padding: 1.5rem;">
                    <div class="form-group">
                        <label for="spugCluster">Target Pilot SPUG Island</label>
                        <select id="spugCluster" class="input-field">
                            ${Object.keys(spugClusters).map(k => `<option value="${k}">${spugClusters[k].name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group" style="margin-top: 1rem;">
                        <label for="spugSolarKW">Solar Addition: <span id="spugSolarVal" class="slider-value">1,000 kW</span></label>
                        <input type="range" id="spugSolarKW" min="0" max="5000" step="100" value="1000">
                    </div>
                    <div class="form-group" style="margin-top: 1rem;">
                        <label for="spugBessKWH">BESS Storage: <span id="spugBessVal" class="slider-value">2,000 kWh</span></label>
                        <input type="range" id="spugBessKWH" min="0" max="10000" step="200" value="2000">
                    </div>
                    <div class="form-group" style="margin-top: 1rem;">
                        <label for="spugDieselPrice">Diesel Fuel Price: <span id="spugDieselVal" class="slider-value">₱70.00/L</span></label>
                        <input type="range" id="spugDieselPrice" min="30" max="100" step="1" value="70">
                    </div>
                </div>
                <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; gap: 1.5rem;">
                    <div style="text-align: center;">
                        <span class="metric-title">Annual UCME Savings</span>
                        <div id="spugSavings" class="metric-value text-green-500" style="font-size: 2.25rem;">₱0.00</div>
                    </div>
                    <div style="text-align: center;">
                        <span class="metric-title">Diesel Displacement</span>
                        <div id="spugDisplacement" class="metric-value text-info" style="font-size: 2.25rem;">0.0%</div>
                    </div>
                </div>
            </div>
            <div class="charts-grid">
                <div class="chart-wrapper">
                    <div class="chart-container" style="position: relative; width: 100%; height: 260px;">
                        <canvas id="spugMixChart"></canvas>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <div class="chart-container" style="position: relative; width: 100%; height: 260px;">
                        <canvas id="spugCostChart"></canvas>
                    </div>
                </div>
            </div>
        `;

        charts.spugMix = new Chart(document.getElementById('spugMixChart'), {
            type: 'doughnut',
            data: { labels: ['Diesel', 'Renewables'], datasets: [{ data: [100, 0], backgroundColor: ['#7e22ce', '#facc15'] }] },
            options: { responsive: true, maintainAspectRatio: false }
        });
        charts.spugCost = new Chart(document.getElementById('spugCostChart'), {
            type: 'bar',
            data: { 
                labels: ['Diesel Only', 'Hybrid System'], 
                datasets: [{ label: 'Annual Cost (Million ₱)', data: [0, 0], backgroundColor: ['#7e22ce', '#6366f1'] }] 
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });

        ['spugCluster', 'spugSolarKW', 'spugBessKWH', 'spugDieselPrice'].forEach(id => {
            document.getElementById(id).addEventListener('input', updateSpug);
        });
        updateSpug();
    }

    function updateSpug() {
        const cluster = spugClusters[document.getElementById('spugCluster').value];
        const solar = parseFloat(document.getElementById('spugSolarKW').value);
        const bess = parseFloat(document.getElementById('spugBessKWH').value);
        const price = parseFloat(document.getElementById('spugDieselPrice').value);

        document.getElementById('spugSolarVal').textContent = `${formatNumber(solar)} kW`;
        document.getElementById('spugBessVal').textContent = `${formatNumber(bess)} kWh`;
        document.getElementById('spugDieselVal').textContent = `₱${price.toFixed(2)}/L`;

        const dieselConsumptionFactor = 0.28;
        const fixedDieselLCOE = 4.5;
        const dieselLCOE = fixedDieselLCOE + (price * dieselConsumptionFactor);
        const annualDemandKwh = cluster.annual_demand_gwh * 1e6;
        const dieselBaselineCost = annualDemandKwh * dieselLCOE;

        const annualSolarGenKwh = solar * 0.18 * 8760;
        const displacementKwh = Math.min(annualSolarGenKwh, annualDemandKwh * 0.85);
        const remainingDieselKwh = annualDemandKwh - displacementKwh;

        const solarCRF = 0.093 * Math.pow(1.093, 20) / (Math.pow(1.093, 20) - 1);
        const solarAnnualizedCost = (solar * 62000 * solarCRF) + (solar * 1000);
        const bessAnnualizedCost = (bess * 25000 * solarCRF);
        
        const hybridCost = solarAnnualizedCost + bessAnnualizedCost + (remainingDieselKwh * dieselLCOE);
        const savings = dieselBaselineCost - hybridCost;
        const displacementPct = (displacementKwh / annualDemandKwh) * 100;

        document.getElementById('spugSavings').textContent = formatCurrency(savings, 'compact');
        document.getElementById('spugDisplacement').textContent = `${displacementPct.toFixed(1)}%`;

        charts.spugMix.data.datasets[0].data = [remainingDieselKwh / 1e6, displacementKwh / 1e6];
        charts.spugMix.update();

        charts.spugCost.data.datasets[0].data = [dieselBaselineCost / 1e6, hybridCost / 1e6];
        charts.spugCost.update();
    }

    // --- WESM DISPATCH ---
    function renderDispatchTab(scenarioMetrics) {
        const pane = document.getElementById('dispatch');
        pane.innerHTML = `
            <div class="info-block">
                <h4>WESM Merit Order Dispatch Simulation</h4>
                <p>Simulates the Wholesale Electricity Spot Market clearing process. Power plants are dispatched in order of lowest marginal cost to meet load requirements.</p>
            </div>
            <div class="form-group card" style="padding: 1.5rem; margin-bottom: 2rem;">
                <label for="dispatchDemand">System Grid Demand Load: <span id="dispatchDemandVal" class="slider-value">0 MW</span></label>
                <input type="range" id="dispatchDemand" min="1000" max="50000" step="500" value="15000">
            </div>
            <div class="charts-grid" style="margin-bottom: 2rem;">
                <div class="chart-wrapper" style="grid-column: span 2; min-height: 400px; display: block;">
                    <div class="chart-container" style="position: relative; width: 100%; height: 350px;">
                        <canvas id="dispatchChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="metrics-row">
                <div class="metric-card primary">
                    <span class="metric-title">Market Clearing Price</span>
                    <div id="wesmPrice" class="metric-value">₱0.00/kWh</div>
                </div>
                <div class="metric-card success">
                    <span class="metric-title">Dispatched Capacity</span>
                    <div id="wesmDispatched" class="metric-value">0 MW</div>
                </div>
            </div>
        `;

        const plants = [...scenarioMetrics.details].sort((a, b) => a.marginalCost - b.marginalCost);
        const totalCap = plants.reduce((sum, p) => sum + p.capacity, 0);

        const slider = document.getElementById('dispatchDemand');
        slider.max = totalCap;
        slider.value = totalCap * 0.65;

        const dispatchChart = new Chart(document.getElementById('dispatchChart'), {
            type: 'bar',
            data: {
                labels: plants.map(p => p.techName),
                datasets: [{ label: 'Capacity (MW)', data: plants.map(p => p.capacity), backgroundColor: plants.map(p => p.color) }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { ticks: { color: '#475569' } }, x: { ticks: { color: '#475569' } } }
            }
        });

        const runDispatch = () => {
            const load = parseFloat(slider.value);
            document.getElementById('dispatchDemandVal').textContent = `${formatNumber(load)} MW`;

            let currentLoad = 0;
            let mcp = 0;
            const colors = [];

            plants.forEach(p => {
                if (currentLoad < load) {
                    colors.push(p.color);
                    mcp = p.marginalCost;
                } else {
                    colors.push('rgba(156, 163, 175, 0.2)');
                }
                currentLoad += p.capacity;
            });

            dispatchChart.data.datasets[0].backgroundColor = colors;
            dispatchChart.update();

            document.getElementById('wesmPrice').textContent = `${formatCurrency(mcp)}/kWh`;
            document.getElementById('wesmDispatched').textContent = `${formatNumber(Math.min(load, totalCap))} MW`;
        };

        slider.addEventListener('input', runDispatch);
        runDispatch();
    }

    // --- GRID STABILITY ---
    function renderStabilityTab(scenarioMetrics) {
        const pane = document.getElementById('stability');
        pane.innerHTML = `
            <div class="info-block">
                <h4>Grid Resiliency & N-1 Line Contingencies</h4>
                <p>Simulate grid backbones and interconnector outages to evaluate system risks, curtailments, and cost increases.</p>
            </div>
            <div class="charts-grid">
                <div class="card" style="padding: 1.5rem;">
                    <h3 class="builder-title">Active N-1 Grid Contingency</h3>
                    <div class="form-group">
                        <select id="contingencySelect" class="input-field">
                            <option value="none">No Contingency (Normal Operations)</option>
                            <option value="luzon_visayas">Luzon-Visayas HVDC Interconnector Link Outage</option>
                            <option value="visayas_mindanao">Mindanao-Visayas Interconnector Link Outage</option>
                            <option value="cnp_backbone">Cebu-Negros-Panay 230kV Backbone Outage</option>
                        </select>
                    </div>
                    <div id="contingencyReport" class="contingency-alert" style="display: none;"></div>
                </div>
                <div class="card" style="padding: 1.5rem;">
                    <h3 class="builder-title">System Inertia & Voltage Check</h3>
                    <div id="stabilityVoltageCheck" style="font-size: 0.9rem;"></div>
                </div>
            </div>
        `;

        const cSelect = document.getElementById('contingencySelect');
        const reportEl = document.getElementById('contingencyReport');
        const voltEl = document.getElementById('stabilityVoltageCheck');

        cSelect.addEventListener('change', () => {
            const val = cSelect.value;
            if (val === 'none') {
                reportEl.style.display = 'none';
                updateUI();
                return;
            }

            let riskCost = 0.20;
            let curtailmentRisk = 15;
            let labelText = '';

            if (val === 'luzon_visayas') {
                labelText = 'Luzon-Visayas HVDC link trip. Grid reinforcement rises by ₱0.20/kWh. RE curtailment risk increases by 15%.';
            } else if (val === 'visayas_mindanao') {
                labelText = 'Mindanao-Visayas Interconnector trip. Isolates Mindanao surplus capacity. Grid reinforcement costs rise by ₱0.25/kWh.';
                riskCost = 0.25;
            } else {
                labelText = 'CNP Backbone congestion. Severely limits solar transmission from Negros. Curtailment risk spikes to 25%.';
                curtailmentRisk = 25;
            }

            reportEl.innerHTML = `<strong>Contingency Active:</strong> ${labelText}`;
            reportEl.style.display = 'block';

            const baselineData = baselineGrids[dom.baselineSelect.value];
            currentBaseline = baselineData[dom.gridSelect.value];
            const baselineMetrics = calculateSystemMetrics(currentBaseline, true);
            const scenarioSystem = [...currentBaseline, ...scenarioAdditions];
            
            const metrics = calculateSystemMetrics(scenarioSystem, false, {}, {
                gridReinforcementCost: parseFloat(dom.gridReinforcementCost.value) + riskCost,
                vreCurtailmentRisk: parseFloat(dom.vreCurtailmentRisk.value) + curtailmentRisk
            });

            dom.totalSystemCost.textContent = `${formatCurrency(metrics.totalSystemCostPerKwh)}/kWh`;
            const tariffImpactValue = ((metrics.totalSystemCostPerKwh / baselineMetrics.totalSystemCostPerKwh) - 1) * 100;
            dom.tariffImpact.textContent = `${tariffImpactValue.toFixed(2)}%`;
        });

        const lastAdded = scenarioAdditions.length > 0 ? scenarioAdditions[scenarioAdditions.length - 1] : null;
        if (lastAdded) {
            voltEl.innerHTML = `
                <p style="color: var(--success); font-weight: bold; margin-bottom: 0.5rem;">● Dynamic Analysis Active</p>
                <p>Latest Addition: <strong>${lastAdded.capacity} MW of ${techData[lastAdded.tech].name}</strong>.</p>
                <p style="margin-top: 0.5rem;">System inertia is at <strong>${scenarioMetrics.systemInertia.toFixed(1)}%</strong>. Voltage support is stable.</p>
            `;
        } else {
            voltEl.innerHTML = '<p style="color: var(--text-secondary);">Add a custom generator to activate stability calculations.</p>';
        }
    }

    // --- SCENARIO COMPARISON ---
    function renderCompareTab() {
        const pane = document.getElementById('compare');
        let html = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="builder-title" style="margin-bottom: 0;">Pinned Scenarios for Comparison</h3>
                <button id="clearPinnedBtn" class="btn btn-secondary" style="width: auto; padding: 0.5rem 1rem;">Clear Pinned</button>
            </div>
        `;

        if (pinnedScenarios.length === 0) {
            html += '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No scenarios pinned. Build a configuration and click "Pin Scenario" in the assumptions panel.</p>';
        } else {
            html += `
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                ${pinnedScenarios.map((s, i) => `<th style="text-align: center;">${s.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Blended Cost per kWh</strong></td>
                                ${pinnedScenarios.map(s => `<td style="text-align: center; font-weight: bold; color: var(--primary);">${formatCurrency(s.metrics.totalSystemCostPerKwh)}/kWh</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Tariff Impact</strong></td>
                                ${pinnedScenarios.map(s => `<td style="text-align: center; font-weight: bold; class="${s.tariffImpact > 0 ? 'text-red-500' : 'text-green-500'}">${s.tariffImpact.toFixed(2)}%</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Renewable Share</strong></td>
                                ${pinnedScenarios.map(s => `<td style="text-align: center;">${s.metrics.reShare.toFixed(1)}%</td>`).join('')}
                            </tr>
                            <tr>
                                <td><strong>Annual Emissions</strong></td>
                                ${pinnedScenarios.map(s => `<td style="text-align: center;">${formatTons(s.metrics.totalEmissions)}</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        }

        pane.innerHTML = html;
        const clearBtn = document.getElementById('clearPinnedBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                pinnedScenarios = [];
                renderCompareTab();
            });
        }
    }

    // --- FINANCIAL ANALYSIS ---
    function renderFinanceTab() {
        const pane = document.getElementById('finance');
        const lastAdded = scenarioAdditions.length > 0 ? scenarioAdditions[scenarioAdditions.length - 1] : null;

        if (!lastAdded) {
            pane.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Add a custom plant to see project viability analysis.</p>';
            return;
        }

        pane.innerHTML = `
            <div class="info-block">
                <h4>Financial Model for: ${lastAdded.capacity} MW ${techData[lastAdded.tech].name}</h4>
                <p>Calculate payback periods and IRR estimates for private sector power plant projects.</p>
            </div>
            <div class="charts-grid">
                <div class="form-group card" style="padding: 1.5rem;">
                    <div class="form-group">
                        <label for="finPrice">PPA Contract / WESM Clearing Price: <span id="finPriceVal" class="slider-value">₱5.00/kWh</span></label>
                        <input type="range" id="finPrice" min="2" max="15" step="0.10" value="5.5">
                    </div>
                </div>
                <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; gap: 1.5rem;" id="financeOutput">
                </div>
            </div>
        `;

        const priceSlider = document.getElementById('finPrice');
        const calcFinance = () => {
            const price = parseFloat(priceSlider.value);
            document.getElementById('finPriceVal').textContent = `₱${price.toFixed(2)}/kWh`;

            const tech = techData[lastAdded.tech];
            const metrics = calculateSystemMetrics([lastAdded], true);
            const totalProjectCost = lastAdded.capacity * tech.capex * 1000;
            
            const annualGenKwh = metrics.totalAnnualGeneration * 1e6;
            const annualRev = annualGenKwh * price;
            const annualOpex = lastAdded.capacity * 1000 * tech.opex;
            const annualFuel = annualGenKwh * tech.fuel_kwh;
            const annualProfit = annualRev - annualOpex - annualFuel;
            const payback = annualProfit > 0 ? totalProjectCost / annualProfit : Infinity;

            document.getElementById('financeOutput').innerHTML = `
                <div>
                    <span class="metric-title">Total Project CAPEX</span>
                    <div class="metric-value">${formatCurrency(totalProjectCost, 'compact')}</div>
                </div>
                <div>
                    <span class="metric-title">Simple Payback Period</span>
                    <div class="metric-value text-info">${isFinite(payback) ? `${payback.toFixed(1)} Years` : 'Unprofitable'}</div>
                </div>
            `;
        };

        priceSlider.addEventListener('input', calcFinance);
        calcFinance();
    }

    // --- FIT TABLE ---
    function renderFitTab() {
        const pane = document.getElementById('fit');
        if (pane.dataset.rendered === 'true') return;
        pane.dataset.rendered = 'true';

        let html = `
            <h3 class="builder-title">Approved ERC Feed-in Tariff (FIT) Rates</h3>
            <div class="table-container" style="margin-bottom: 2rem;">
                <table>
                    <thead>
                        <tr>
                            <th>Technology</th>
                            <th>FIT Round</th>
                            <th>Rate (₱/kWh)</th>
                            <th>Target (MW)</th>
                            <th>Subscribed (MW)</th>
                            <th>Plants</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${fitData.map(item => `
                            <tr>
                                <td>${item.tech}</td>
                                <td>${item.fit}</td>
                                <td>${formatCurrency(item.rate)}</td>
                                <td>${item.target ? formatNumber(item.target) : 'N/A'}</td>
                                <td>${formatNumber(item.subscribed)}</td>
                                <td>${item.plants}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <h3 class="builder-title">FIT Allowance (FIT-All) Rate Roadmap</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>FIT-All Rate (₱/kWh)</th>
                            <th>ERC Policy Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${fitAllData.map(item => `
                            <tr>
                                <td>${item.year}</td>
                                <td>${item.rate ? formatCurrency(item.rate, 'standard', 4) : 'Suspended'}</td>
                                <td>${item.notes}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        pane.innerHTML = html;
    }

    // --- GEA SUMMARY ---
    function renderGeaTab() {
        const pane = document.getElementById('gea');
        if (pane.dataset.rendered === 'true') return;
        pane.dataset.rendered = 'true';

        const list = preDefinedScenarios.gea1_to_5_total;
        let html = `
            <div class="info-block" style="border-left-color: var(--danger); background-color: rgba(239, 68, 68, 0.03);">
                <h4 style="color: var(--danger);">Registry of Terminated Power Plants (Excluded from Scenarios)</h4>
                <p style="margin-top: 0.25rem; font-size: 0.8rem; line-height: 1.4;">
                    Per the latest registry updates, the following winning projects from GEA-1 have been officially terminated by the DOE. A total of <strong>1,230.0 MW</strong> of Solar capacity has been removed from all GEA scenarios in this simulator:
                </p>
                <ul style="margin-top: 0.5rem; padding-left: 1.25rem; list-style-type: disc; font-size: 0.8rem; color: var(--text-secondary);">
                    <li><strong>Concepcion Tarlac 2 Solar Power Project</strong> (Solar Philippines Rooftops) — <strong>200.0 MW</strong> (Solar)</li>
                    <li><strong>Santa Rosa Nueva Ecija 2 Solar Power Project</strong> (Solar Philippines Nueva Ecija) — <strong>280.0 MW</strong> (Solar)</li>
                    <li><strong>Tayabas Solar Power Project</strong> (Solar Philippines Rooftops) — <strong>450.0 MW</strong> (Solar)</li>
                    <li><strong>Kananga-Ormoc Solar Power Project</strong> (Solar Philippines Visayas) — <strong>300.0 MW</strong> (Solar)</li>
                </ul>
            </div>
            
            <h3 class="builder-title">Active Green Energy Auction Program (GEA 1-5) Awards</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Technology Type</th>
                            <th style="text-align: right;">Capacity Awarded/Targeted (MW)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${list.map(item => `
                            <tr>
                                <td>${techData[item.tech].name}</td>
                                <td style="text-align: right; font-weight: bold; color: var(--primary);">${formatNumber(item.capacity)} MW</td>
                            </tr>
                        `).join('')}
                        <tr style="border-top: 2px solid var(--primary); font-weight: bold;">
                            <td>Total GEA Program Active Capacity</td>
                            <td style="text-align: right;">${formatNumber(list.reduce((s,i)=>s+i.capacity,0))} MW</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        pane.innerHTML = html;
    }

    // --- SOCIO ECONOMIC ---
    function renderSocioTab(baselineMetrics, scenarioMetrics) {
        const pane = document.getElementById('socio');
        const profiles = [
            { name: 'Low-Income Lifeline Consumer', consumption: 50, icon: '🏠' },
            { name: 'Average Residential Home', consumption: 250, icon: '🏙️' },
            { name: 'SME Commercial Shop', consumption: 1500, icon: '🏪' }
        ];

        pane.innerHTML = `
            <div class="info-block">
                <h4>Social Impact Assessment</h4>
                <p>Calculates the absolute impact of the simulated system tariff changes on various household and commercial segments.</p>
            </div>
            <div class="charts-grid">
                ${profiles.map(p => {
                    const baseBill = baselineMetrics.totalSystemCostPerKwh * p.consumption;
                    const scenBill = scenarioMetrics.totalSystemCostPerKwh * p.consumption;
                    const diff = scenBill - baseBill;
                    
                    return `
                        <div class="card" style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <span style="font-size: 1.25rem; margin-right: 0.5rem;">${p.icon}</span>
                                <strong style="font-size: 1rem; color: var(--text-primary);">${p.name}</strong>
                                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">Usage: ${p.consumption} kWh/month</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-weight: 800; font-size: 1.25rem;" class="${diff >= 0 ? 'text-red-500' : 'text-green-500'}">
                                    ${diff >= 0 ? '+' : ''}${formatCurrency(diff)}
                                </div>
                                <div style="font-size: 0.75rem; color: var(--text-muted);">From ${formatCurrency(baseBill)}/mo</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // --- SENSITIVITY AND REPORTING ---
    function renderSensitivityTab(baselineMetrics, scenarioMetrics) {
        const pane = document.getElementById('sensitivity');
        pane.innerHTML = `
            <div class="info-block">
                <h4>Sensitivity Testing & Report Export</h4>
                <p>Analyze how variations in technology parameters affect the baseline tariff projections, or export the simulation metrics.</p>
            </div>
            <div class="charts-grid" style="margin-bottom: 2rem;">
                <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                    <h3 class="builder-title" style="margin-bottom: 0;">Parameter Sensitivity</h3>
                    <div class="form-group">
                        <label for="sensCapex">CAPEX Variation: <span id="sensCapexVal" class="slider-value">0%</span></label>
                        <input type="range" id="sensCapex" min="-20" max="20" step="5" value="0">
                    </div>
                    <div class="form-group">
                        <label for="sensFuel">Fossil Fuel Price Variation: <span id="sensFuelVal" class="slider-value">0%</span></label>
                        <input type="range" id="sensFuel" min="-20" max="20" step="5" value="0">
                    </div>
                </div>
                <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; gap: 1rem;">
                    <button id="btnGenerateReport" class="btn btn-primary">Generate Text Report</button>
                    <button id="btnExportCsv" class="btn btn-secondary">Export Data CSV</button>
                </div>
            </div>
        `;

        const sCapex = document.getElementById('sensCapex');
        const sFuel = document.getElementById('sensFuel');

        const triggerSens = () => {
            const capexVar = parseFloat(sCapex.value);
            const fuelVar = parseFloat(sFuel.value);

            document.getElementById('sensCapexVal').textContent = `${capexVar > 0 ? '+' : ''}${capexVar}%`;
            document.getElementById('sensFuelVal').textContent = `${fuelVar > 0 ? '+' : ''}${fuelVar}%`;

            const scenarioSystem = [...currentBaseline, ...scenarioAdditions];
            const sensMetrics = calculateSystemMetrics(scenarioSystem, false, {
                capex: capexVar,
                fuel: fuelVar
            });

            dom.totalSystemCost.textContent = `${formatCurrency(sensMetrics.totalSystemCostPerKwh)}/kWh`;
            const tariffImpactValue = ((sensMetrics.totalSystemCostPerKwh / baselineMetrics.totalSystemCostPerKwh) - 1) * 100;
            dom.tariffImpact.textContent = `${tariffImpactValue.toFixed(2)}%`;
        };

        sCapex.addEventListener('input', triggerSens);
        sFuel.addEventListener('input', triggerSens);

        document.getElementById('btnGenerateReport').addEventListener('click', () => {
            const report = generateTextReportContent(baselineMetrics, scenarioMetrics);
            dom.reportText.value = report;
            dom.reportModal.classList.add('open');
        });

        document.getElementById('btnExportCsv').addEventListener('click', () => {
            exportToCsvFile(scenarioMetrics);
        });
    }

    function generateTextReportContent(baselineMetrics, scenarioMetrics) {
        const tariffImpactValue = ((scenarioMetrics.totalSystemCostPerKwh / baselineMetrics.totalSystemCostPerKwh) - 1) * 100;
        let report = `PHILIPPINE POWER SYSTEM COST & TARIFF SIMULATION REPORT\n`;
        report += `========================================================\n`;
        report += `Generated On: ${new Date().toLocaleString()}\n`;
        report += `Grid: ${dom.gridSelect.options[dom.gridSelect.selectedIndex].text}\n`;
        report += `Scenario Preset: ${dom.scenarioSelect.options[dom.scenarioSelect.selectedIndex].text}\n\n`;
        report += `KEY PERFORMANCE INDICATORS:\n`;
        report += ` - Baseline Cost: ${formatCurrency(baselineMetrics.totalSystemCostPerKwh)}/kWh\n`;
        report += ` - Scenario Cost: ${formatCurrency(scenarioMetrics.totalSystemCostPerKwh)}/kWh\n`;
        report += ` - Projected Tariff Impact: ${tariffImpactValue.toFixed(2)}%\n`;
        report += ` - Renewable Share: ${scenarioMetrics.reShare.toFixed(1)}%\n`;
        report += ` - Jobs Created: ${formatNumber(scenarioMetrics.totalJobs, 0)}\n`;
        report += ` - CO2 Emissions: ${formatTons(scenarioMetrics.totalEmissions)}\n\n`;
        report += `SCENARIO ANALYSIS DETAILS:\n`;
        scenarioMetrics.details.forEach(d => {
            report += ` - [${d.techName}] Capacity: ${formatNumber(d.capacity)} MW, Gen: ${formatNumber(d.annualGenerationGWh, 1)} GWh\n`;
        });
        return report;
    }

    function exportToCsvFile(scenarioMetrics) {
        let csv = "Technology,Capacity (MW),Annual Generation (GWh),Emissions (tCO2)\n";
        scenarioMetrics.details.forEach(d => {
            csv += `"${d.techName}",${d.capacity},${d.annualGenerationGWh.toFixed(2)},${d.emissions.toFixed(0)}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `grid_sim_export_${dom.gridSelect.value}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // --- SCENARIO MANAGEMENT EVENT LISTENERS ---
    dom.addPlantBtn.addEventListener('click', () => {
        const type = dom.plantType.value;
        const modelId = dom.specificModel.value;
        let count = parseInt(dom.unitCount.value) || 1;
        let capacity = parseFloat(dom.capacity.value);

        if (capacity > 0) {
            scenarioAdditions.push({ tech: type, capacity: capacity });
            dom.scenarioSelect.value = 'custom';
            updateUI();
        }
    });

    dom.pinScenarioBtn.addEventListener('click', () => {
        if (pinnedScenarios.length >= 3) {
            alert('A maximum of 3 scenarios can be pinned for comparison.');
            return;
        }

        const baselineData = baselineGrids[dom.baselineSelect.value];
        currentBaseline = baselineData[dom.gridSelect.value];
        const baselineMetrics = calculateSystemMetrics(currentBaseline, true);
        const scenarioSystem = [...currentBaseline, ...scenarioAdditions];
        const metrics = calculateSystemMetrics(scenarioSystem);

        const tariffImpact = ((metrics.totalSystemCostPerKwh / baselineMetrics.totalSystemCostPerKwh) - 1) * 100;
        const presetText = dom.scenarioSelect.options[dom.scenarioSelect.selectedIndex].text;

        pinnedScenarios.push({
            name: dom.scenarioSelect.value === 'custom' ? `Custom Scenario ${pinnedScenarios.length + 1}` : presetText,
            metrics: metrics,
            tariffImpact: tariffImpact
        });
        alert('Scenario pinned successfully! View it in the "Compare Scenarios" tab.');
    });

    dom.resetBtn.addEventListener('click', () => {
        scenarioAdditions = [];
        dom.scenarioSelect.value = 'custom';
        dom.demandScenario.value = '5.5';
        dom.reCostReduction.value = '2.0';
        dom.gridUpgrade.value = 'upgraded';
        dom.gridReinforcementCost.value = '0.10';
        dom.vreCurtailmentRisk.value = '5';
        dom.vreAncillaryCost.value = '0.0015';
        if (dom.overrideWesm) {
            dom.overrideWesm.checked = false;
            dom.wesmOverrideWrapper.style.display = 'none';
            dom.manualWesmRate.value = '6.00';
            dom.manualWesmVal.textContent = '₱6.00/kWh';
        }
        updateUI();
    });

    // Dynamic dropdown bindings
    dom.plantType.addEventListener('change', () => {
        const type = dom.plantType.value;
        dom.specificModel.innerHTML = '';
        
        const models = specificModels[type] || [];
        models.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = `${m.name} (${m.capacity} MW)`;
            dom.specificModel.appendChild(opt);
        });

        if (models.length > 0) {
            dom.unitCountWrapper.style.display = 'block';
            dom.capacity.readOnly = true;
            updateUnitCapacity();
        } else {
            dom.unitCountWrapper.style.display = 'none';
            dom.capacity.readOnly = false;
            dom.capacity.value = '100';
            dom.capacityHelper.textContent = '';
        }
    });

    function updateUnitCapacity() {
        const type = dom.plantType.value;
        const modelId = dom.specificModel.value;
        const models = specificModels[type] || [];
        const model = models.find(m => m.id === modelId);
        
        if (model) {
            const count = parseInt(dom.unitCount.value) || 1;
            dom.capacity.value = (model.capacity * count).toFixed(1);
            dom.capacityHelper.textContent = `Capacity dynamically calculated based on unit count.`;
        }
    }

    dom.specificModel.addEventListener('change', updateUnitCapacity);
    dom.unitCount.addEventListener('input', updateUnitCapacity);

    // Baseline/Grid Select hooks
    dom.baselineSelect.addEventListener('change', updateUI);
    dom.gridSelect.addEventListener('change', updateUI);
    dom.scenarioSelect.addEventListener('change', () => {
        const val = dom.scenarioSelect.value;
        scenarioAdditions = preDefinedScenarios[val] ? [...preDefinedScenarios[val]] : [];
        updateUI();
    });

    if (dom.overrideWesm) {
        dom.overrideWesm.addEventListener('change', () => {
            dom.wesmOverrideWrapper.style.display = dom.overrideWesm.checked ? 'block' : 'none';
            updateUI();
        });
        dom.manualWesmRate.addEventListener('input', () => {
            dom.manualWesmVal.textContent = `₱${parseFloat(dom.manualWesmRate.value).toFixed(2)}/kWh`;
            updateUI();
        });
    }

    // Sidebar accordions
    document.querySelectorAll('.section-title').forEach(header => {
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('accordion-collapsed');
        });
    });

    // Tabs Nav event hooks
    dom.tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            dom.tabButtons.forEach(b => b.classList.remove('active'));
            dom.tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetPane = document.getElementById(btn.dataset.tab);
            if (targetPane) targetPane.classList.add('active');
            
            const baselineData = baselineGrids[dom.baselineSelect.value];
            currentBaseline = baselineData[dom.gridSelect.value];
            const baselineMetrics = calculateSystemMetrics(currentBaseline, true);
            const scenarioSystem = [...currentBaseline, ...scenarioAdditions];
            const scenarioMetrics = calculateSystemMetrics(scenarioSystem);

            renderActiveTab(baselineMetrics, scenarioMetrics);
        });
    });

    // Close Modal Event Handler
    dom.closeModalBtn.addEventListener('click', () => {
        dom.reportModal.classList.remove('open');
    });

    dom.copyReportBtn.addEventListener('click', () => {
        dom.reportText.select();
        document.execCommand('copy');
        alert('Report copied to clipboard.');
    });

    // --- INIT SEQUENCE ---
    function init() {
        dom.plantType.dispatchEvent(new Event('change'));
        initCharts();
        updateUI();
    }

    init();
});
