class AlphabetContainer {
  private child: Map<string, AlphabetContainer> = new Map();
  value: string = ''
  isEndOfWord: boolean = false;
  
  hasChild(char: string): boolean {
    return this.child.has(char)
  }
  
  getChild(char: string): AlphabetContainer | undefined {
    return this.child.get(char)
  }
  
  setChild(char: string): void {
    const newNode = new AlphabetContainer();
    newNode.value = char;
    this.child.set(char, newNode);
  }
  
  getChildren(): IterableIterator<AlphabetContainer> {
    return this.child.values();
  }
  
  hasChildren(): boolean {
    return this.getChildren().next().value !== undefined
  }
  
  removeChild(char: string): void {
    this.child.delete(char)
  }
  
}


export class Trie {
  
  root: AlphabetContainer = new AlphabetContainer();
  
  insert(word: string): void {
  
    let theRoot = this.root;
    
    // for(let char of word.toLocaleLowerCase()) {
    //   if(theRoot.child.has(char)) {
    //     // this.insert()
    //     // @ts-ignore
    //     theRoot = theRoot.child.get(char)
    //   } else {
    //     theRoot.child.set(char, new AlphabetContainer())
    //     // @ts-ignore
    //     theRoot = theRoot.child.get(char)
    //   }
      
    // }
    
    this._insert(word.toLowerCase(), theRoot)
    
  }
  
  private _insert(word: string, root: AlphabetContainer): void {
    if(word.length <= 0) {
      root.isEndOfWord = true;
      return;
    }
  
    const char = word.slice(0,1)
    
    if(root.hasChild(char)){
      //@ts-ignore
      this._insert(word.slice(1, word.length), root.getChild(char))
    } else {
      root.setChild(char)
      // @ts-ignore
      this._insert(word.slice(1, word.length), root.getChild(char))
      
    }
  }
  
  contains(word: string): boolean {
    if(word.length === 0) return false;
    return this._contains(word.toLowerCase(), this.root)
  }
  
  private _contains(word: string, root: AlphabetContainer): boolean {
  
    if(word.length <= 0) return root.isEndOfWord;
    
    const char = word.slice(0,1)
    
    if(root.hasChild(char)) {
      // @ts-ignore
      return this._contains(word.slice(1, word.length), root.getChild(char))
    } 
    return false
  }

  remove(word: string): void {
    if(word.length === 0) return;
    this._remove(word, this.root);
  }
  
  private _remove(word: string, root: AlphabetContainer): void {
  
    if(word.length <= 0) {
      root.isEndOfWord = false;
      return;
    }
    
    const char = word.slice(0,1);
    const sliceWord = word.slice(1, word.length);
    const child = root.getChild(char)
    if(!child) return
    
    this._remove(sliceWord, child)
    
    if(!child.hasChildren() && !child.isEndOfWord) root.removeChild(char)
    
    
    return;
  }
  
  traversal(): void {
    this._traversal(this.root);
  }
  
  private _traversal(root: AlphabetContainer): void {
    
    for(const child of root.getChildren()) {
      
      this._traversal(child)
    }
    console.log(root.value);
  }
  
  listOfWords(word: string): Array<string> {
  
    const words: Array<string> = []
    const lastCharNode = this.findLastNode(word);
    if(!lastCharNode) return words
    return this._listOfWords(word, words, lastCharNode);
  }
  
  private _listOfWords(word: string, words: Array<string>, root: AlphabetContainer): Array<string> {
    if(!root) return words;
    
    if(root.isEndOfWord) words.push(word);
    
    for(const child of root.getChildren())
      this._listOfWords(word.concat(child.value), words, child)
    
    return words;
  }
  
  private findLastNode(word: string): AlphabetContainer | null {
    if(!word) return null;
  
    let current = this.root;
    
    for(const char of word) {
      const child = current.getChild(char);
      if(!child) return null;
      current = child;
    }
    return current;
  }
  
}


