import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Type something. Test the Editor... ヽ(^。^)丿',
    translate: 'no'
  };

  htmlContent = '<div class=\"question-content\">\n    <p></p>\n    <p>Given an array of integers, return <b>indices</b> of the two numbers such that they add up to a specific target.\n    </p>\n\n    <p>You may assume that each input would have <b><i>exactly</i></b> one solution, and you may not use the <i>same</i>\n        element twice.</p>\n\n    <p>\n        <b>Example:</b><br>\n    </p>\n    <pre>Given nums = [2, 7, 11, 15], target = 9,\n\nBecause nums[<b>0</b>] + nums[<b>1</b>] = 2 + 7 = 9,\nreturn [<b>0</b>, <b>1</b>].\n</pre>\n    <p></p>\n    <p></p>\n</div>';

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  showSuccess(){
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

}
