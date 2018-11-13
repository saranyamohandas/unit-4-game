$(document).ready(function(){
//    var combatPoints = [{name : 'avatar1',hp:100,ap:20},
//                         {name :'avatar2', hp:200,ap:20},{name:'avatar3',hp:350,ap:30},
//                         {name: 'avatar4',hp:500,ap:25}];
    var combatPoints = [{name : 'John Snow',hp:100,ap:20},
                         {name :'Cersei', hp:200,ap:20},{name:'Daenerys',hp:350,ap:30},
                         {name: 'White Walker',hp:500,ap:25}];
    var challenger = false;
    var defender = false;
    var defeated = 0;
    var challengerAp = 0;
    var defenderAp = 0;
    var attacks = 0;
    var getChallengerId;
    var getDefenderId;
    var getChallengerpt = {};
    var getDefenderpt = {};
    
    console.log(challenger);
    console.log(combatPoints);
    $('#avatar1').find('p:last').text('HP:' + combatPoints[0].hp);
    $('#avatar2').find('p:last').text('HP:' + combatPoints[1].hp);
    $('#avatar3').find('p:last').text('HP:' + combatPoints[2].hp);
    $('#avatar4').find('p:last').text('HP:' + combatPoints[3].hp);
    $('#challengeZone').hide();
    $('#defenderZone').hide();
    $('#attack').hide();
    $('#score').hide();
    
    $('.card').on('click',function(){
        if (!challenger){
            challenger = true;
            getChallengerId = $(this).attr('id');
            console.log(getChallengerId);
            var getChallengerName = $(this).find("p:first").text();
            var getChallengerImg = $(this).find('img').attr('src');
            var getChallengerHp = $(this).find("p:last").text();
            $(this).hide();
            
            $('#challengerName').text(getChallengerName);
            $('#challengerHp').text(getChallengerHp);
            $('#challengerImg').attr('src',getChallengerImg);
            $('#challengeZone').show();
            //$('#challengeZone').css('display','block');
            
            console.log(getChallengerName);
            console.log(getChallengerHp);
            console.log(getChallengerImg);
            getChallengerpt = getCombatAp(getChallengerName);
        } else if(defeated <= combatPoints.length -1) {
            
            defeated =+ 1;
            console.log("defeated - ",defeated);
            getDefenderId = $(this).attr('id');
            console.log(getDefenderId);
            var getDefenderName = $(this).find("p:first").text();
            var getDefenderImg = $(this).find('img').attr('src');
            var getDefenderHp = $(this).find("p:last").text();
            $(this).hide();
//            $('#attack').css('display','block');
            $('#attack').show();
            $('#defenderName').text(getDefenderName);
            $('#defenderHp').text(getDefenderHp);
            $('#defenderImg').attr('src',getDefenderImg);
            $('#defenderZone').show();
//            $('#defenderZone').css('display','block');
            getDefenderpt = getCombatAp(getDefenderName);
            console.log(getDefenderName);
            console.log(getDefenderHp);
            console.log(getDefenderImg);
            
            
        }
    });
    $('#attack').click(function(){
       
       
        console.log(!challengerAp);
      //  if(!challengerAp){
            console.log("challengerap");
            console.log(getChallengerId);
            console.log(getChallengerpt);
            console.log(getDefenderpt);
            if(getChallengerpt.attackerHp > 0){
                getChallengerpt.attackerHp = getChallengerpt.attackerHp - getDefenderpt.attackerAp;
                $('#challengerHp').text("HP :" +getChallengerpt.attackerHp );
                attacks ++;
                console.log(attacks);
                console.log(getChallengerpt.attackerHp);
                
            } else {
                
                
                
            }
            if(getDefenderpt.attackerHp > 0){
                getDefenderpt.attackerHp = getDefenderpt.attackerHp - getChallengerpt.attackerAp;
                getChallengerpt.attackerAp = getChallengerpt.attackerAp * 2;
                $('#defenderHp').text("HP :" +getDefenderpt.attackerHp );
                $('.defendend').text(getDefenderName); $('#yourDamage').text(getChallengerpt.attackerAp);
                $('#score').show();
            
                
                
            }

         
        
    });
    function getCombatAp(attacker){
        for(i=0;i<combatPoints.length; i++){
                if(combatPoints[i].name == attacker){
                attackerAp = combatPoints[i].ap;              
                attackerHp = combatPoints[i].hp;
                return {attackerAp : attackerAp,attackerHp: attackerHp};
                console.log(attackerAp)
                console.log(attackerHp);
            }
            }
    }
    function updateHp(Hp){
            
    }
    

});