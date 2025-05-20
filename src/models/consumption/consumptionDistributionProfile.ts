/**
 * Average consumption distribution profile for a residential customer in Spain. It shows per month,
 * per hour of the day, and per price timeband, the average percentage of consumption of the whole day
 * (in that timeband) that takes place in that hour.
 *
 * For instance: consumptionDistributionProfile[0][0].percentValley = 8.685462905381616 means that,
 * on average, 8.69% of the total consumption of the month of January, in the "valley" timeband, takes
 * place in the first hour of the day (00:00 - 01:00). This hour is always in the "valley" timeband,
 * regardless of the day of the week.
 *
 * Calculated from: https://www.boe.es/eli/es/res/2024/12/23/(5)
 *
 * Timebands information: https://www.holaluz.com/en/glossary/time-of-use-tariffs
 *
 */
export const consumptionDistributionProfile = [
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.685462905381616,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.268657066213108,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.39536068377074,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.926855001660209,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.739414582626688,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.845987046516727,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.473579118372487,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.843164784417889,
    },
    {
      percentPeak: 0.0,
      percentFlat: 10.248641192467884,
      percentValley: 2.313110477965331,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.398746858420443,
      percentValley: 2.4608241347253523,
    },
    {
      percentPeak: 11.016653268286769,
      percentFlat: 0.0,
      percentValley: 2.617824764785932,
    },
    {
      percentPeak: 11.20641824245685,
      percentFlat: 0.0,
      percentValley: 2.638737821522527,
    },
    {
      percentPeak: 11.317179937256611,
      percentFlat: 0.0,
      percentValley: 2.6734945889074857,
    },
    {
      percentPeak: 11.925413901892952,
      percentFlat: 0.0,
      percentValley: 2.8283469957176743,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.730698159271078,
      percentValley: 2.9016433424704524,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.845459496231237,
      percentValley: 2.7415088805806387,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.187365390027269,
      percentValley: 2.6118451399993883,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.266574405471346,
      percentValley: 2.645942517766421,
    },
    {
      percentPeak: 12.161720127432996,
      percentFlat: 0.0,
      percentValley: 2.971909963336901,
    },
    {
      percentPeak: 13.436856709349874,
      percentFlat: 0.0,
      percentValley: 3.3287680750351982,
    },
    {
      percentPeak: 14.371852465045599,
      percentFlat: 0.0,
      percentValley: 3.600120715804843,
    },
    {
      percentPeak: 14.563905348278341,
      percentFlat: 0.0,
      percentValley: 3.6253510447507584,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.824406055367072,
      percentValley: 3.2179767655509584,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.498108442743689,
      percentValley: 2.644113582120673,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.191367565716435,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.865416793501043,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.078025227839305,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.673585994817006,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.527682894517745,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.680170692887239,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.4096862147459035,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.885005719967244,
    },
    {
      percentPeak: 0.0,
      percentFlat: 10.648235019966409,
      percentValley: 2.6119312424624503,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.813684762795967,
      percentValley: 2.683669827273448,
    },
    {
      percentPeak: 11.161588330995158,
      percentFlat: 0.0,
      percentValley: 2.753791111391363,
    },
    {
      percentPeak: 11.247211789847698,
      percentFlat: 0.0,
      percentValley: 2.7295316926257365,
    },
    {
      percentPeak: 11.313020022690722,
      percentFlat: 0.0,
      percentValley: 2.7563325780912478,
    },
    {
      percentPeak: 11.904385351248159,
      percentFlat: 0.0,
      percentValley: 2.9066254872851767,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.670321238712138,
      percentValley: 2.9812520857768408,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.682204604513897,
      percentValley: 2.8337316847844973,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.903588539722824,
      percentValley: 2.6918718260367633,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.802962269812994,
      percentValley: 2.6879441001454967,
    },
    {
      percentPeak: 11.269026668617558,
      percentFlat: 0.0,
      percentValley: 2.9031598443973112,
    },
    {
      percentPeak: 13.380526218340247,
      percentFlat: 0.0,
      percentValley: 3.410643882432227,
    },
    {
      percentPeak: 14.789040934008874,
      percentFlat: 0.0,
      percentValley: 3.7306372276876436,
    },
    {
      percentPeak: 14.935200684251566,
      percentFlat: 0.0,
      percentValley: 3.777769826389874,
    },
    {
      percentPeak: 0.0,
      percentFlat: 15.038673054586575,
      percentValley: 3.3926225943936927,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.440330509889204,
      percentValley: 2.8375438848343237,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.673309470918284,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.07704390656686,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.432791480880326,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.063876383984492,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.909392207403117,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.068298813782761,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.7591105349538925,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.9808835873910775,
    },
    {
      percentPeak: 0.0,
      percentFlat: 10.439618852306891,
      percentValley: 2.4517913285151773,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.679659988101749,
      percentValley: 2.5362703868994214,
    },
    {
      percentPeak: 11.241257285474706,
      percentFlat: 0.0,
      percentValley: 2.604557209893588,
    },
    {
      percentPeak: 11.458487676650618,
      percentFlat: 0.0,
      percentValley: 2.603801024760554,
    },
    {
      percentPeak: 11.684647631984268,
      percentFlat: 0.0,
      percentValley: 2.662175254450032,
    },
    {
      percentPeak: 12.39190051517847,
      percentFlat: 0.0,
      percentValley: 2.8294648217917113,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.011996383334205,
      percentValley: 2.8949241713395497,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.842461435576597,
      percentValley: 2.71896312128795,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.97100990756297,
      percentValley: 2.5633204523730377,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.773730278117007,
      percentValley: 2.5419664324422615,
    },
    {
      percentPeak: 10.950089856691909,
      percentFlat: 0.0,
      percentValley: 2.644141870317543,
    },
    {
      percentPeak: 12.656195760087263,
      percentFlat: 0.0,
      percentValley: 3.0527203365932385,
    },
    {
      percentPeak: 14.605245615726192,
      percentFlat: 0.0,
      percentValley: 3.4797924554180715,
    },
    {
      percentPeak: 15.012175658206553,
      percentFlat: 0.0,
      percentValley: 3.575186884141135,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.902746163817005,
      percentValley: 3.197012013072654,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.378776991183582,
      percentValley: 2.6792058508232746,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.673431145509461,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.333994924294133,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.505279526223778,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.0743581261363095,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.908965831642143,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.050921548143749,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.669453744605409,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.7705101971528245,
    },
    {
      percentPeak: 0.0,
      percentFlat: 10.823572972184783,
      percentValley: 2.143657831457972,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.791934661412302,
      percentValley: 2.4934149715201954,
    },
    {
      percentPeak: 11.726849084298898,
      percentFlat: 0.0,
      percentValley: 2.761250017412868,
    },
    {
      percentPeak: 11.865800604858734,
      percentFlat: 0.0,
      percentValley: 2.8470045624666493,
    },
    {
      percentPeak: 12.153078786411223,
      percentFlat: 0.0,
      percentValley: 2.8974181579341485,
    },
    {
      percentPeak: 12.929025721198691,
      percentFlat: 0.0,
      percentValley: 3.061725298815538,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.869434227814233,
      percentValley: 3.070959214689132,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.655432771880632,
      percentValley: 2.7522218718679903,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.72699133800061,
      percentValley: 2.5287302090245882,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.450348596473175,
      percentValley: 2.4584598382305245,
    },
    {
      percentPeak: 10.897531274598588,
      percentFlat: 0.0,
      percentValley: 2.4990479189201684,
    },
    {
      percentPeak: 11.561752809614488,
      percentFlat: 0.0,
      percentValley: 2.67410654105864,
    },
    {
      percentPeak: 13.36714360810259,
      percentFlat: 0.0,
      percentValley: 3.1362911221518424,
    },
    {
      percentPeak: 15.498818110916782,
      percentFlat: 0.0,
      percentValley: 3.653673440436823,
    },
    {
      percentPeak: 0.0,
      percentFlat: 15.046425839958557,
      percentValley: 3.3035047719960966,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.635859592275706,
      percentValley: 2.731619188309024,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.76614345757589,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.487332281673435,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.694737591630175,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.289689165995016,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.123544202299003,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.22428258598254,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.682183526128875,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.5678237642997015,
    },
    {
      percentPeak: 0.0,
      percentFlat: 10.320700435178086,
      percentValley: 2.376445942832275,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.59235920904561,
      percentValley: 2.471305735625682,
    },
    {
      percentPeak: 11.809264663941683,
      percentFlat: 0.0,
      percentValley: 2.5573049699989685,
    },
    {
      percentPeak: 12.129335497524238,
      percentFlat: 0.0,
      percentValley: 2.5995227792119944,
    },
    {
      percentPeak: 12.52597826131889,
      percentFlat: 0.0,
      percentValley: 2.714970262789613,
    },
    {
      percentPeak: 13.39222130543924,
      percentFlat: 0.0,
      percentValley: 2.919804845065809,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.248833782145262,
      percentValley: 2.955246951147924,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.794377804908333,
      percentValley: 2.701679463438941,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.834361392555405,
      percentValley: 2.5252507027224715,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.636648689837397,
      percentValley: 2.5161295884305472,
    },
    {
      percentPeak: 11.131147775402862,
      percentFlat: 0.0,
      percentValley: 2.5690321534024054,
    },
    {
      percentPeak: 11.610523598346784,
      percentFlat: 0.0,
      percentValley: 2.726436839281898,
    },
    {
      percentPeak: 12.763575283800455,
      percentFlat: 0.0,
      percentValley: 3.061052106611315,
    },
    {
      percentPeak: 14.637953614225857,
      percentFlat: 0.0,
      percentValley: 3.480102992366784,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.94455230113974,
      percentValley: 3.280480497274265,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.628166385190164,
      percentValley: 2.709497594214458,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.943280112221151,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.714272079517288,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.9145434411406415,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.477120868223681,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.258613169614577,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.257144216798925,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.425763181392099,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.974587166840888,
    },
    {
      percentPeak: 0.0,
      percentFlat: 9.801106555006687,
      percentValley: 2.1099366022698987,
    },
    {
      percentPeak: 0.0,
      percentFlat: 10.750783334579712,
      percentValley: 2.3958088716082253,
    },
    {
      percentPeak: 11.176811769278467,
      percentFlat: 0.0,
      percentValley: 2.610021474252316,
    },
    {
      percentPeak: 11.648158129437885,
      percentFlat: 0.0,
      percentValley: 2.7127208896868127,
    },
    {
      percentPeak: 12.287195356896646,
      percentFlat: 0.0,
      percentValley: 2.8441608127624485,
    },
    {
      percentPeak: 13.384525075221104,
      percentFlat: 0.0,
      percentValley: 3.0840482723141176,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.11676214739611,
      percentValley: 3.136547600580928,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.028239326092356,
      percentValley: 2.8893792251104884,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.356121149652656,
      percentValley: 2.7207682274358365,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.26147220328285,
      percentValley: 2.67210095953702,
    },
    {
      percentPeak: 11.944468342881608,
      percentFlat: 0.0,
      percentValley: 2.6701849232551136,
    },
    {
      percentPeak: 12.252904613542766,
      percentFlat: 0.0,
      percentValley: 2.678615478017175,
    },
    {
      percentPeak: 13.095560096900893,
      percentFlat: 0.0,
      percentValley: 2.7506583495286274,
    },
    {
      percentPeak: 14.210376615840644,
      percentFlat: 0.0,
      percentValley: 2.9445609992936403,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.826395818854646,
      percentValley: 3.054924547659944,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.859119465134992,
      percentValley: 2.7602385309381585,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 9.312823161731334,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.118815244548804,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.289281001005484,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.785653345471617,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.476251687821205,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.338858033071889,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.349413938331828,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.478065736864264,
    },
    {
      percentPeak: 0.0,
      percentFlat: 8.686255189904742,
      percentValley: 1.77738806676993,
    },
    {
      percentPeak: 0.0,
      percentFlat: 9.765470830414676,
      percentValley: 2.023716979511296,
    },
    {
      percentPeak: 10.657137463425872,
      percentFlat: 0.0,
      percentValley: 2.250103646097456,
    },
    {
      percentPeak: 11.292060490735679,
      percentFlat: 0.0,
      percentValley: 2.410484270813207,
    },
    {
      percentPeak: 12.099397064568702,
      percentFlat: 0.0,
      percentValley: 2.583223463831677,
    },
    {
      percentPeak: 13.300339411473686,
      percentFlat: 0.0,
      percentValley: 2.841068327908524,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.118897721110487,
      percentValley: 3.010998762404898,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.867935299960857,
      percentValley: 2.9326341426050497,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.512677935550933,
      percentValley: 2.8464049854659264,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.366341290346352,
      percentValley: 2.8160702933094233,
    },
    {
      percentPeak: 13.153668552807622,
      percentFlat: 0.0,
      percentValley: 2.8017455834518463,
    },
    {
      percentPeak: 12.94744078680545,
      percentFlat: 0.0,
      percentValley: 2.7902296417430827,
    },
    {
      percentPeak: 12.961699172498362,
      percentFlat: 0.0,
      percentValley: 2.841910954502481,
    },
    {
      percentPeak: 13.58825705768463,
      percentFlat: 0.0,
      percentValley: 3.019986814705072,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.996429664209764,
      percentValley: 3.1062159814709127,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.6859920685022,
      percentValley: 2.798655936562807,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 9.255839783705657,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.182938890049844,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.378659473793736,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.871994013645992,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.559667260250306,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.407675735436519,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.450334328714112,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.454999731207943,
    },
    {
      percentPeak: 0.0,
      percentFlat: 8.58737115072136,
      percentValley: 1.847279131419839,
    },
    {
      percentPeak: 0.0,
      percentFlat: 9.826332472080601,
      percentValley: 2.0924092781259227,
    },
    {
      percentPeak: 10.760815237706332,
      percentFlat: 0.0,
      percentValley: 2.28181922463421,
    },
    {
      percentPeak: 11.471242703303192,
      percentFlat: 0.0,
      percentValley: 2.4104786951873156,
    },
    {
      percentPeak: 12.228999024864711,
      percentFlat: 0.0,
      percentValley: 2.576671912650996,
    },
    {
      percentPeak: 13.39537368863577,
      percentFlat: 0.0,
      percentValley: 2.833023490047015,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.3015095655833,
      percentValley: 2.9976689139226798,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.847732904669982,
      percentValley: 2.917958078176511,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.382552275519979,
      percentValley: 2.8326365367951323,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.149912949114261,
      percentValley: 2.7931680624641735,
    },
    {
      percentPeak: 12.78637987429066,
      percentFlat: 0.0,
      percentValley: 2.741123859900719,
    },
    {
      percentPeak: 12.572500266393655,
      percentFlat: 0.0,
      percentValley: 2.6883057702530144,
    },
    {
      percentPeak: 12.71812586301724,
      percentFlat: 0.0,
      percentValley: 2.724678657407941,
    },
    {
      percentPeak: 14.066563341788449,
      percentFlat: 0.0,
      percentValley: 3.0181770284626523,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.130929878623661,
      percentValley: 2.995927643708722,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.773658803686846,
      percentValley: 2.6865645000390566,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.641037565634011,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.561660403184467,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.861015297292748,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.464962497152225,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.263745170478212,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.268945422396198,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.690016384168826,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.60457935341784,
    },
    {
      percentPeak: 0.0,
      percentFlat: 10.43352846413278,
      percentValley: 1.8927457685092752,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.076807944459967,
      percentValley: 2.289264899720163,
    },
    {
      percentPeak: 10.999892206614295,
      percentFlat: 0.0,
      percentValley: 2.600223205271293,
    },
    {
      percentPeak: 11.339227888649026,
      percentFlat: 0.0,
      percentValley: 2.747628785156937,
    },
    {
      percentPeak: 11.920906288953873,
      percentFlat: 0.0,
      percentValley: 2.8645377565586916,
    },
    {
      percentPeak: 12.906496889007657,
      percentFlat: 0.0,
      percentValley: 3.0873806848976106,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.993323858803327,
      percentValley: 3.1207472148288073,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.024885596663308,
      percentValley: 2.8017784248199757,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.416126847806847,
      percentValley: 2.61056744381305,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.410154471316977,
      percentValley: 2.55550322663718,
    },
    {
      percentPeak: 11.72738689283435,
      percentFlat: 0.0,
      percentValley: 2.5653744223810273,
    },
    {
      percentPeak: 12.057480777119377,
      percentFlat: 0.0,
      percentValley: 2.613878863842156,
    },
    {
      percentPeak: 13.923803970021407,
      percentFlat: 0.0,
      percentValley: 2.9772207183741353,
    },
    {
      percentPeak: 15.124805086800016,
      percentFlat: 0.0,
      percentValley: 3.291490431909997,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.369012156600483,
      percentValley: 3.000022224339553,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.276160660216329,
      percentValley: 2.6256738352156215,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.376046778283786,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.238752463253026,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.602871723698733,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.208543210303633,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.041854441470949,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.129545817571507,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.765759561888113,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.240034750074301,
    },
    {
      percentPeak: 0.0,
      percentFlat: 10.812672857308105,
      percentValley: 2.3956888933077103,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.53805242733528,
      percentValley: 2.433923000091801,
    },
    {
      percentPeak: 11.223928918827148,
      percentFlat: 0.0,
      percentValley: 2.5127110301319893,
    },
    {
      percentPeak: 11.53670545841531,
      percentFlat: 0.0,
      percentValley: 2.5487112381820736,
    },
    {
      percentPeak: 11.97633767565964,
      percentFlat: 0.0,
      percentValley: 2.6600412153546733,
    },
    {
      percentPeak: 12.81201585886073,
      percentFlat: 0.0,
      percentValley: 2.8654958329108293,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.252457322720977,
      percentValley: 2.9034077450485856,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.932239511645566,
      percentValley: 2.6526521522179896,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.977687722744552,
      percentValley: 2.4842932095155885,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.815022408735262,
      percentValley: 2.486312320162258,
    },
    {
      percentPeak: 10.989479195809821,
      percentFlat: 0.0,
      percentValley: 2.5810169084061516,
    },
    {
      percentPeak: 12.266570597659635,
      percentFlat: 0.0,
      percentValley: 2.9312670815949877,
    },
    {
      percentPeak: 14.438711643825716,
      percentFlat: 0.0,
      percentValley: 3.498764316543005,
    },
    {
      percentPeak: 14.756250650941983,
      percentFlat: 0.0,
      percentValley: 3.530661861867416,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.410573182100178,
      percentValley: 3.0596520489016283,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.261294567410085,
      percentValley: 2.5399474536913895,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.290793213556578,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.037134052454934,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.279251029502575,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.88831061955185,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.746658584580806,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.899914467495497,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.609507047010579,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.019635514710064,
    },
    {
      percentPeak: 0.0,
      percentFlat: 10.413626330282748,
      percentValley: 2.4763451986345575,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.609390204692906,
      percentValley: 2.5362218300058617,
    },
    {
      percentPeak: 10.84630236718932,
      percentFlat: 0.0,
      percentValley: 2.5957446757077784,
    },
    {
      percentPeak: 11.044961865610725,
      percentFlat: 0.0,
      percentValley: 2.602260053935199,
    },
    {
      percentPeak: 11.279386950709782,
      percentFlat: 0.0,
      percentValley: 2.6731037483191007,
    },
    {
      percentPeak: 12.047994875932465,
      percentFlat: 0.0,
      percentValley: 2.859396403208087,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.047001055503838,
      percentValley: 2.938406441832376,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.856634904722611,
      percentValley: 2.7652034851581213,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.062889775972451,
      percentValley: 2.628439495401345,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.338510408705648,
      percentValley: 2.704383459112627,
    },
    {
      percentPeak: 12.352225541406533,
      percentFlat: 0.0,
      percentValley: 3.0869334954691174,
    },
    {
      percentPeak: 13.504699641580089,
      percentFlat: 0.0,
      percentValley: 3.350585234228598,
    },
    {
      percentPeak: 14.485668922675336,
      percentFlat: 0.0,
      percentValley: 3.5725503429363967,
    },
    {
      percentPeak: 14.438759834895757,
      percentFlat: 0.0,
      percentValley: 3.5824265836904687,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.585364673863948,
      percentValley: 3.185902384945776,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.086582646255843,
      percentValley: 2.6708926385516927,
    },
  ],
  [
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 8.713996811519124,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.323871161946897,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.445121227813469,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.9718346241796745,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.785646637694061,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 5.894902242470139,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 6.497264621221143,
    },
    {
      percentPeak: 0.0,
      percentFlat: 0.0,
      percentValley: 7.759145132855831,
    },
    {
      percentPeak: 0.0,
      percentFlat: 10.676857845461608,
      percentValley: 1.918463219232471,
    },
    {
      percentPeak: 0.0,
      percentFlat: 11.474907711265391,
      percentValley: 2.3696148834717228,
    },
    {
      percentPeak: 10.906550214928586,
      percentFlat: 0.0,
      percentValley: 2.7298898511200926,
    },
    {
      percentPeak: 10.95632925867829,
      percentFlat: 0.0,
      percentValley: 2.854213233285556,
    },
    {
      percentPeak: 11.093295267259956,
      percentFlat: 0.0,
      percentValley: 2.8888062267606114,
    },
    {
      percentPeak: 11.761255553950594,
      percentFlat: 0.0,
      percentValley: 3.029910079514589,
    },
    {
      percentPeak: 0.0,
      percentFlat: 13.43508534870464,
      percentValley: 3.048211830799802,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.691205664598337,
      percentValley: 2.788262633151489,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.17399799424848,
      percentValley: 2.635892032862374,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.56815386662889,
      percentValley: 2.693779152209295,
    },
    {
      percentPeak: 12.685300755015724,
      percentFlat: 0.0,
      percentValley: 3.0327633692660845,
    },
    {
      percentPeak: 13.557237266808785,
      percentFlat: 0.0,
      percentValley: 3.1949579895070137,
    },
    {
      percentPeak: 14.433444756961622,
      percentFlat: 0.0,
      percentValley: 3.355584907939371,
    },
    {
      percentPeak: 14.606586926396453,
      percentFlat: 0.0,
      percentValley: 3.3753865241558905,
    },
    {
      percentPeak: 0.0,
      percentFlat: 14.65071319296993,
      percentValley: 3.0550325885884573,
    },
    {
      percentPeak: 0.0,
      percentFlat: 12.329078376122704,
      percentValley: 2.6374490184348365,
    },
  ],
]
