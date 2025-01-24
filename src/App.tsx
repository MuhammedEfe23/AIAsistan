{/* Sadece değiştirilecek bölümü gösteriyorum, diğer kodlar aynı kalacak */}
<div className="relative">
  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-navy-400 via-navy-600 to-navy-800 flex items-center justify-center mx-auto ring-[6px] ring-navy-500/30 shadow-xl transform hover:scale-110 transition-all duration-500 group overflow-hidden">
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-navy-400/20 to-transparent animate-spin-slow"></div>
    <img 
      src="FOTOĞRAF_URLNİZİ_BURAYA_YAZIN" 
      alt="Muhammed Efe Deveci" 
      className="w-full h-full object-cover absolute inset-0 rounded-full z-20"
    />
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-navy-400/20 via-navy-500/20 to-navy-600/20 blur-md group-hover:blur-xl transition-all duration-500 z-30"></div>
  </div>
  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 animate-float">
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-400 to-navy-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
      <div className="relative px-4 py-1 bg-gradient-to-r from-navy-600 to-navy-500 rounded-full flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
        <Star className="w-3 h-3 text-yellow-400 animate-pulse" />
        <span className="text-xs font-medium text-white">Muhammed Efe DEVECİ</span>
      </div>
    </div>
  </div>
</div>