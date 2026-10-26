export const flowsheets = [
    {
        name: 'NF-DSPM-DE flowsheet',
        sweepVariable: 'Feedvolumetricflowrate',
        sweepValues: ['3500', '3600']
    },
    //BSM2 has issues on Mac/Linux
    // {
    //     name: 'BSM2 flowsheet',
    //     sweepVariable: 'Feedvolumetricflowrate',
    //     sweepValues: ['20000', '21000'],
    // },
    // {
    //     name: 'BSM2_P_extension flowsheet',
    //     sweepVariable: 'Feedvolumetricflowrate',
    //     sweepValues: ['20000', '21000'],
    // },
    {
        name: 'Dye Desalination flowsheet',
        sweepVariable: 'Feedvolumetricflowrate',
        sweepValues: ['270', '290'],
    },
    {
        name: 'Mechanical vapor compression flowsheet',
        sweepVariable: 'Feedmassflow',
        sweepValues: ['35','45'],
    },
    {
        name: 'RO with energy recovery flowsheet',
        sweepVariable: 'Feedwatermassflowrate',
        sweepValues: ['0.7','0.8'],
    },
    {
        name: 'OARO flowsheet',
        sweepVariable: 'Feedwatermassflowrate',
        sweepValues: ['5','6'],
    },
    {
        name: 'Granular Activated Carbon (GAC) flowsheet',
        sweepVariable: 'GACmediaapparentdensity',
        sweepValues: ['700','800'],
    },
    {
        name: 'Electrodialysis with concentrate recirculation flowsheet',
        sweepVariable: 'Feedsolutionvolumeflowrate',
        sweepValues: ['0.001','0.002'],
    },
    {
        name: 'LSRRO flowsheet',
        sweepVariable: 'Pump1outletpressure',
        sweepValues: ['80','90'],
    },
    {
        name: 'Generic treatment train flowsheet',
        sweepVariable: 'Desal1waterrecovery',
        sweepValues: ['80','90'],
    },
]