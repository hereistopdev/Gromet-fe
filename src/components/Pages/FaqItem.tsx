import React, { useEffect, useState } from 'react';
import './HelpFAQ.css';

import { Collapse } from 'antd';

const { Panel } = Collapse;

function FaqItem({ title, text, activeKey, index }: { title: string; text: string | React.ReactNode, activeKey: string, index :string }) {

  const onChange = (key: any) => {
    console.log(key);
    // activeKey = key;
  };
  // console.log("active key:", activeKey, title, activeKey === '-1')
  return (
    <div className="faqItemCollapseContainer">
      <Collapse
        expandIconPosition="end"
        defaultActiveKey={activeKey === '-1' ? [] : [activeKey]}
        onChange={(e) => onChange(e)}
      >
        <Panel header={title} key={index}>
          { typeof(text) === typeof("string") && <div dangerouslySetInnerHTML={{ __html: text!.toString() }}></div>
          }
          {
             typeof(text) !== typeof("string") && text
          }
        </Panel>
      </Collapse>
    </div>
  );
}

export default FaqItem;
