/**
 * 数字计算
 * @param str
 * @returns {number}
 */
function numberSum(str) {
    let res = Number(str);
    if (!Number.isNaN(res)) {
        return res;
    }
    if (Number.isNaN(res) && str.indexOf('+')>-1) {
        let arr = str.split('+');
        let sum = Number(0);
        arr.forEach(val=>{
            sum += Number(val.trim());
        });
        return sum;
    }
    return NaN;
}

function toFixed4(num) {
    let res = num.toFixed(4);
    let index = res.length - 1;
    for (let i = res.length - 1; i >= 0; i--) {
        if (res[i] !== '0') {
            index = i;
            break;
        }
    }
    if (res[index] === '.') {
        // 1.0000
        res = res.substring(0, index)
    } else {
        // 1.0010
        res = res.substring(0, index+1);
    }
    return res;
}

function getRndInteger2(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 生成汇报内容
 */
function report() {
    let gongsi = document.getElementsByName('reportType')[0].checked;
    let jituan = document.getElementsByName('reportType')[1].checked;
    if (!gongsi && !jituan) {
        document.getElementById('tip-model').style.display='block'
        document.getElementById('tip-content').innerHTML = '❌️先选个汇报类型吧！';
        return;
    }

    // 按钮特效
    let animates = ['rubberBand', 'bounce', 'flash', 'pulse', 'shake', 'swing', 'tada', 'wobble'];
    // let index = getRndInteger2(0, 7);
    $('#reportBtn').addClass('animated '+ animates[0]);
    setTimeout(function(){
        $('#reportBtn').removeClass(animates[0]);
    }, 1000);

    let old = document.getElementById('old').value;
    let month = old.substring(old.indexOf('月度'), old.indexOf('年度'));
    let year = old.substring(old.indexOf('年度'));

    let laidianReg = /来电(\d+)[组，]+/;
    let laifangReg = /，[来访客户]*(\d+)[组，]+/;
    let ziranReg = /自然来访(\d+)[组，]+/;
    let ziquReg = /，自渠来访(\d+)[组，]+/;
    let zhongjieReg = /，中介来访(\d+)[组，]+/;
    let qudaoReg = /，渠道来访(\d+)[组，]+/;
    let zaifangReg = /，再访(\d+)[组，]+/;
    let rengouReg = /认购(\d+)[套，]+/;
    let rengouJineReg = /金额([\d\.]+)[万元，]+/;
    let hetongReg = /合同(\d+)[套|，]/;
    let hetongJineReg = /合同金额([\d\.]+)[万元，]+/;
    let huikuanReg = /回款([\d\.]+)[万元，]+/;


    // 当日
    let laidian = Number(document.getElementById('laidian').value);
    let laifang = Number(document.getElementById('laifang').value);
    let xinfang = Number(document.getElementById('xinfang').value);
    let ziran = Number(document.getElementById('ziran').value);
    let ziqu = Number(document.getElementById('ziqu').value);
    let zhongjie = Number(document.getElementById('zhongjie').value);
    let qudao = ziqu + zhongjie;
    let zaifang = Number(document.getElementById('zaifang').value);
    let yezhu = Number(document.getElementById('yezhu').value);
    let canguan = Number(document.getElementById('canguan').value);
    let heyuan = Number(document.getElementById('heyuan').value);
    let dieshu = Number(document.getElementById('dieshu').value);
    let yangfang = Number(document.getElementById('yangfang').value);
    let qita = Number(document.getElementById('qita').value);
    let rengou = Number(document.getElementById('rengou').value);
    let rengoujine = numberSum(document.getElementById('rengoujine').value);
    let hetong = Number(document.getElementById('hetong').value);
    let hetongjine = numberSum(document.getElementById('hetongjine').value);
    let huikuan = numberSum(document.getElementById('huikuan').value);

    // 月度
    console.log('月度');
    let monthStart = false;
    if (moment().date() === 1) {
        monthStart = true;
    }
    month.match(laidianReg);
    let mlaidianReg = monthStart ? 0 : Number(RegExp.$1)
    mlaidianReg += (laidian);

    month.match(laifangReg);
    let mlaifangReg = monthStart ? 0 : Number(RegExp.$1)
    mlaifangReg += laifang;

    month.match(ziranReg);
    let mziranReg = monthStart ? 0 : Number(RegExp.$1)
    mziranReg += (ziran);

    month.match(ziquReg);
    let mziquReg = monthStart ? 0 : Number(RegExp.$1)
    mziquReg += (ziqu);

    month.match(zhongjieReg);
    let mzhongjieReg = monthStart ? 0 : Number(RegExp.$1)
    mzhongjieReg += (zhongjie);

    month.match(qudaoReg);
    let mqudaoReg = monthStart ? 0 : Number(RegExp.$1)
    mqudaoReg += (zhongjie + ziqu);

    month.match(zaifangReg);
    let mzaifangReg = monthStart ? 0 : Number(RegExp.$1)
    mzaifangReg += (zaifang);

    month.match(rengouReg);
    let mrengouReg = monthStart ? 0 : Number(RegExp.$1)
    mrengouReg+= (rengou);

    month.match(rengouJineReg);
    let mrengouJineReg = monthStart ? 0 : Number(RegExp.$1)
    mrengouJineReg += (rengoujine);

    month.match(hetongReg);
    let mhetongReg = monthStart ? 0 : Number(RegExp.$1)
    mhetongReg+= hetong;

    month.match(hetongJineReg);
    let mhetongJineReg = monthStart ? 0 : Number(RegExp.$1)
    mhetongJineReg += (hetongjine);

    month.match(huikuanReg);
    let mhuikuanReg = monthStart ? 0 : Number(RegExp.$1)
    mhuikuanReg += (huikuan);


    // 年度
    console.log('年度');
    let yearStart = false;
    if (moment().dayOfYear() === 1) {
        yearStart = true;
    }
    year.match(laidianReg);
    let ylaidianReg = yearStart ? 0 : Number(RegExp.$1)
    ylaidianReg += (laidian);

    year.match(laifangReg);
    let ylaifangReg = yearStart ? 0 : Number(RegExp.$1)
    ylaifangReg += (laifang);

    year.match(hetongReg);
    let yhetongReg = yearStart ? 0 : Number(RegExp.$1)
    yhetongReg += (hetong);

    year.match(hetongJineReg);
    let yhetongJineReg = yearStart ? 0 : Number(RegExp.$1)
    yhetongJineReg += (hetongjine);

    year.match(huikuanReg);
    let yhuikuanReg = yearStart ? 0 : Number(RegExp.$1)
    yhuikuanReg += (huikuan);


    // 公司日报
    if(gongsi) {
        let content = '【' + moment().format("MM月DD日") + '销售日报】\n' +
            '【当日】来电' + laidian + '组，来访' + laifang + '组，其中新访' + xinfang + '组（自然来访' + ziran + '组，自渠来访' + ziqu + '组，中介来访' + zhongjie + '组），再访' + zaifang + '组，业主' + yezhu + '组，参观' + canguan + '组。\n' +
            '当日来访客户中意向，合院' + heyuan + '组，叠墅' + dieshu + '组，洋房' + yangfang + '组，其他' + qita + '组。\n' +
            '当日认购' + rengou + '套，金额' + toFixed4(rengoujine) + '万元；\n' +
            '当日合同' + hetong + '套，合同金额' + toFixed4(hetongjine) + '万元；\n' +
            '当日回款' + toFixed4(huikuan) + '万元。\n' +
            '【月度】\n' +
            '来电' + mlaidianReg + '组，来访' + mlaifangReg + '组（自然来访' + mziranReg + '组，自渠来访' + mziquReg + '组，中介来访' + mzhongjieReg + '组，再访' + mzaifangReg + '组）\n' +
            '认购' + mrengouReg + '套，金额' + toFixed4(mrengouJineReg) + '万元；\n' +
            '合同' + mhetongReg + '套，合同金额' + toFixed4(mhetongJineReg) + '万元；\n' +
            '回款' + toFixed4(mhuikuanReg) + '万元。\n' +
            '【年度】\n' +
            '来电' + ylaidianReg + '组，来访客户' + ylaifangReg + '组。\n' +
            '合同' + yhetongReg + '套，合同金额' + toFixed4(yhetongJineReg) + '万元，回款' + toFixed4(yhuikuanReg) + '万元。';

        document.getElementById('new').value = content;
        return;
    }


    // 集团日报
    if(jituan) {
        let content2 = '【' + moment().format("MM月DD日") + '销售日报】\n' +
            '【当日】来电' + laidian + '组，来访' + laifang + '组，其中新访' + xinfang + '组（自然来访' + ziran + '组，渠道来访' + qudao + '组），再访' + zaifang + '组，业主' + yezhu + '组，参观' + canguan + '组。\n' +
            '当日认购' + rengou + '套，金额' + toFixed4(rengoujine) + '万元；\n' +
            '当日合同' + hetong + '套，合同金额' + toFixed4(hetongjine) + '万元；\n' +
            '当日回款' + toFixed4(huikuan) + '万元。\n' +
            '【月度】\n' +
            '来电' + mlaidianReg + '组，来访' + mlaifangReg + '组（自然来访' + mziranReg + '组，渠道来访' + mqudaoReg + '组，再访' + mzaifangReg + '组）\n' +
            '认购' + mrengouReg + '套，金额' + toFixed4(mrengouJineReg) + '万元；\n' +
            '合同' + mhetongReg + '套，合同金额' + toFixed4(mhetongJineReg) + '万元；\n' +
            '回款' + toFixed4(mhuikuanReg) + '万元。\n' +
            '【年度】\n' +
            '来电' + ylaidianReg + '组，来访客户' + ylaifangReg + '组。\n' +
            '合同' + yhetongReg + '套，合同金额' + toFixed4(yhetongJineReg) + '万元，回款' + toFixed4(yhuikuanReg) + '万元。';

        document.getElementById('new').value = content2;
    }

}