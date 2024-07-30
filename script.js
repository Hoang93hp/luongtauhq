//Chức vụ
var he_so_tau_hai_quan = 0;
chuc_vu.addEventListener("change", function() {
	var chuc_vu_duoc_chon = chuc_vu.options[chuc_vu.selectedIndex];
	var chi_so_chuc_vu_duoc_chon = chuc_vu_duoc_chon.value;
	if (chi_so_chuc_vu_duoc_chon == 1 || chi_so_chuc_vu_duoc_chon == 2 || chi_so_chuc_vu_duoc_chon == 3) {
		he_so_tau_hai_quan = 1;
	}
	else if (chi_so_chuc_vu_duoc_chon == 4) {
		he_so_tau_hai_quan = 0.8;
	}
	else if (chi_so_chuc_vu_duoc_chon == 5 || chi_so_chuc_vu_duoc_chon == 6){
		he_so_tau_hai_quan = 0.7;
	}
  });

//Thâm niên
var kqthamnien = 0;

//Thâm niên tháng
var m = 0;
var thang_nhap_ngu = document.getElementById("thang_nhap_ngu");
thang_nhap_ngu.addEventListener("change", function() {
	var thang_duoc_chon = thang_nhap_ngu.options[thang_nhap_ngu.selectedIndex];
	var chi_so_thang_duoc_chon = thang_duoc_chon.value;
	m = chi_so_thang_duoc_chon;
});


//Thâm niên năm
var y = 0;
var nam_nhap_ngu = document.getElementById("nam_nhap_ngu");
nam_nhap_ngu.addEventListener("change", function() {
	var nam_duoc_chon = nam_nhap_ngu.options[nam_nhap_ngu.selectedIndex];
	var chi_so_nam_duoc_chon = nam_duoc_chon.value;
	const d = new Date();
	let namhientai = d.getFullYear()
	y = namhientai - chi_so_nam_duoc_chon;
});

//Tháng muốn xem lương
var so_ngay_an = 0;
var n = 0;
thang_luong.addEventListener("change", function() {
	var thang_luong_duoc_chon = thang_luong.options[thang_luong.selectedIndex];
	var chi_so_thang_luong_duoc_chon = thang_luong_duoc_chon.value;
	n = chi_so_thang_luong_duoc_chon;
	if (chi_so_thang_luong_duoc_chon == 1 || chi_so_thang_luong_duoc_chon == 3 || chi_so_thang_luong_duoc_chon == 5 || chi_so_thang_luong_duoc_chon == 7 || chi_so_thang_luong_duoc_chon == 8 || chi_so_thang_luong_duoc_chon == 10 || chi_so_thang_luong_duoc_chon == 12) {
		so_ngay_an = 31;
	}
	else if (chi_so_thang_luong_duoc_chon == 4 || chi_so_thang_luong_duoc_chon == 6 || chi_so_thang_luong_duoc_chon == 9 || chi_so_thang_luong_duoc_chon == 11) {
		so_ngay_an = 30;
	}
	else so_ngay_an = 28;
  });

function ket_qua() {
	//Nhập thông tin
	var hesonhapvao = parseFloat(document.getElementById("he_so_quan_ham").value);
	let heso = isNaN(hesonhapvao) ? 0 : hesonhapvao;
	//Nhập vào hệ số chức vụ
	let hesochucvunhapvao = parseFloat(document.getElementById("he_so_chuc_vu").value);
	let hesochucvu = isNaN(hesochucvunhapvao) ? 0 : hesochucvunhapvao;

	//Nhập vào hệ số trách nhiệm
	let hesotrachnhiemnhapvao = parseFloat(document.getElementById("he_so_trach_nhiem").value);
	let hesotrachnhiem = isNaN(hesotrachnhiemnhapvao) ? 0 : hesotrachnhiemnhapvao;

	//lương chính
	let luongcoban = 1800000;
	let luongchinh = heso * luongcoban;

	//In ra kết quả
	//Màu
	document.getElementById("ket_qua").style.backgroundColor = "#516EAB";
	var ket_qua = document.getElementById("ket_qua");
	ket_qua.style.height = ket_qua.scrollHeight + 20 + "px";
	var elements = document.getElementsByClassName("danh_sachxt");
	for (var i = 0; i < elements.length; i++) {
  		elements[i].style.color = "white";
	}
	document.getElementById("tieu_dext").style.color = "white"
	//
	document.getElementById("luong_chinh").innerHTML = Math.round(luongchinh);

	//Chức vụ
	document.getElementById("kqchucvu").innerHTML = Math.round(luongcoban * hesochucvu);

	//Trách nhiệm
	document.getElementById("kqtrachnhiem").innerHTML = Math.round(luongcoban * hesotrachnhiem);
	document.getElementById("cong_vu").innerHTML = Math.round(0.25 * (luongchinh + luongcoban * hesochucvu));
	document.getElementById("tau_chien").innerHTML = Math.round(0.25 * (luongchinh + luongcoban * hesochucvu));
	document.getElementById("doc_hai").innerHTML = Math.round(0.4 * luongcoban);
	document.getElementById("tau_hai_quan").innerHTML = Math.round(he_so_tau_hai_quan * luongcoban);

	//Thâm niên in kết quả
	if (n - m < 0) {
		kqthamnien = y - 1;
		}
	else kqthamnien = y;
	document.getElementById("tham_nien").innerHTML = Math.round(kqthamnien/100 * (luongchinh + luongcoban * hesochucvu));

	//Bảo hiểm
	document.getElementById("bao_hiem").innerHTML = Math.round(-0.08 * (luongchinh + luongcoban * hesochucvu + kqthamnien/100 * (luongchinh + luongcoban * hesochucvu)));
	
	//Tiền ăn
	document.getElementById("an").innerHTML = Math.round(-so_ngay_an * 68360);

	//Tổng tiền nhận được về thẻ
	document.getElementById("tong").innerHTML = Math.round(luongchinh + (luongcoban * hesochucvu) + (luongcoban * hesotrachnhiem) + (0.5 * (luongchinh + luongcoban * hesochucvu)) + (0.4 * luongcoban) + (he_so_tau_hai_quan * luongcoban) + (kqthamnien/100 * (luongchinh + luongcoban * hesochucvu)) + (-0.08 * (luongchinh + luongcoban * hesochucvu + kqthamnien/100 * (luongchinh + luongcoban * hesochucvu))) + (-so_ngay_an * 68360));
}
