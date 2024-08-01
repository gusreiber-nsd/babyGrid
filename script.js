function drawWorld(){
  // DOM CONSTANTS
  const TMP = document.getElementById("templates");
  const S   = document.getElementById("screen");

  // Create consume outfits...
  const outfit = new Costume("boy",
        {kind:"x", buff:"blue", damage:0},
        {},
        {kind:"leather", buff:"blue", damage:50}
  );
  
  const blue = new Costume("blue",{kind:"x", buff:"x", severity:0});
  const dragon = new Costume("dragon",{kind:"x", buff:"x", severity:0});



  // create charachets wearing the outfits
  const me    = new Character(outfit,"screen");
  const you   = new Character(blue,"screen","50px");
  const he    = new Character({},"screen","80%");
  const the   = new Character(dragon, "screen", "33%", "60px",false,false,true);
  

}

// Position Model
class PosObj {
  targetId;
  x;     y;
  units; height; width;
  name;  id;
  
  constructor(targetId,x,y,units,ratio,flipLeft,name,id){
    this.targetId = targetId;    
    this.x = x;
    this.y = y;
    this.units = units;
    this.ratio = ratio;
    this.flipLeft = flipLeft;
    this.name = name;
    this.id = id;
  }
}
// equipment model
class Item{
  kind;
  buff;
  damage;
  durrability;
  
  constructor(kind, buff, damage, durrability){
    this.kind = kind;
    this.buff = buff;
    this.damage = damage;
    this.durrability = durrability;   
  }
  
}
// OUTFIT Model
class Costume{
  style;
  
  head;
  chest;
  stomach;
  belt;
  cloak;
  leftSholder;
  rightSholder;
  leftBicept;
  rightBicept;
  leftHand;
  rightHand;
  leftLeg;
  rightLeg;
  leftKnee;
  rightKnee;
  leftShin;
  rightShin;
  leftFoot;
  rightFoot;
  
  constructor(style,head,chest,stomach){
    this.style  = style || "";
    this.head   = head;
    this.chest   = chest;
    this.stomach   = stomach;
  }
  
}

// Character class
class Character extends PosObj{
  CLONE = document.getElementById("person-template").cloneNode(true);
  targetId;
  costume;
  
  constructor(costume,targetId,x,y,units,ratio,flipLeft,name,id){ 
    super(targetId,x,y,units,name,id);
    this.costume = costume;
    this.targetId = targetId;
    
    this.x = x;  this.y = y;
    this.ratio = ratio || [6,20];
    this.units = units || "6px";
    this.flipLeft = flipLeft;
    this.draw();
  }
  
  draw(){
    const t = document.getElementById(this.targetId);
    const c = this.CLONE;
    c.removeAttribute("id");
    c.style.left = this.x;
    c.style.bottom = this.y;
    c.style.fontSize =  this.units;
    
    if(this.flipLeft) c.style.transform = "scale(-1,1)";
    if(this.id) c.id = this.id;
    
    if(this.costume) this.equip();
    t.appendChild(c);   
  
    return c;
  }

  equip(){
    this.CLONE.classList.add(this.costume.style);
    for(const p in this.costume){
      const c = this.costume[p];
      let  cName = p.toLowerCase();
      console.log(c);
      const side = (cName.indexOf("right") > -1)? "right" :
                   (cName.indexOf("left") > -1)?  "left"  : "" ;
      cName = cName.replace("right","").replace("left","");
      const dom = this.CLONE.querySelector("." + cName);
      
      if(p !== "style" && c){
        dom.classList.add(c.kind);
        dom.classList.add(c.buff);
        dom.classList.add("d" + c.damage);

        dom.style.filter = `brightness( ${100-c.damage}% )`;
      }
    }
  }
  
  styleCharacter(classToAdd){
    this.CLONE.classList.add(classToAdd);
    return this.CLONE;
  }
  
  styleLimb(limbClass, classToAdd){
    const dom = this.CLONE.querySelectorAll(limbClass);
    dom.classList.add(classToAdd);
    return dom;
  }
  
  rotateCharacter(deg){
    const sTrans = dom.style.transform;
    const rotate = ` rotate(${deg}deg)`;
    if(!sTrans) sTrans = rotate;
      else if(sTrans.indexOf("rotate(") > -1) 
        sTrans.replace("(rotate\()(\D*)(\d+)",deg);
      else dom.style.transform += rotate;
    return this.CLONE;
  }
  rotateLimb(limbClass,deg){
    const dom = this.CLONE.querySelectorAll(limbClass);
    dom.style.transform = `rotate(${deg}deg)`;
    return dom;
  }
  
}
drawWorld();