import { Point, Direction } from '@topology/core';


export default function myAnchors(node) {
  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height / 2, Direction.Left));
  // node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height / 2, Direction.Right));
  // node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y + node.rect.height, Direction.Bottom));

  // demo，其他自定义锚点。这里只是示例。
  // for (let i = 10; i < 360; i += 10) {
  //   if (i % 90 === 0) {
  //     continue;
  //   }

  //   const direction = Math.floor(i / 90);
  //   const pt = new Point(
  //     node.rect.center.x + (Math.sin((i / 180) * Math.PI) * node.rect.width) / 2,
  //     node.rect.center.y + (Math.cos((i / 180) * Math.PI) * node.rect.height) / 2,
  //     direction
  //   );
  //   pt.hidden = false;
  //   node.anchors.push(pt);
  //   console.log('pt:', pt,'node',node)
  // }
}
